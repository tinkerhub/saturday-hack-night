import { google } from "googleapis";

export interface SheetProject {
  name: string;
  creator: string;
  github: string;
  liveUrl?: string;
  description?: string;
  tags: string[];
  featured: boolean;
}

/**
 * Clean environment variable values that may contain quotes, escaped newlines, or trailing commas
 */
function cleanEnvVar(val: string | undefined): string {
  if (!val) return "";
  let cleaned = val.trim();
  if (cleaned.endsWith(",")) {
    cleaned = cleaned.slice(0, -1).trim();
  }
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1);
  }
  return cleaned;
}

/**
 * Initializes and returns an authenticated Google Sheets client
 */
function getGoogleSheetsClient() {
  const clientEmail = cleanEnvVar(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  let privateKey = cleanEnvVar(process.env.GOOGLE_PRIVATE_KEY);
  const spreadsheetId =
    cleanEnvVar(process.env.GOOGLE_SHEET_ID) ||
    "1yaXlPEYYB8ZiYCV09sS2U9cAck6Ft0uvs1sBmZ_Ft_s";

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing Google Sheets API credentials. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY."
    );
  }

  // Handle escaped newlines in private key
  privateKey = privateKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  return { sheets, spreadsheetId };
}

/**
 * Fetches all projects from Google Sheets with dynamic column resolution
 */
export async function fetchAllProjectsFromSheet(): Promise<SheetProject[]> {
  const { sheets, spreadsheetId } = getGoogleSheetsClient();

  // 1. Fetch spreadsheet metadata to discover sheet / tab name
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
  });

  const sheetName =
    meta.data.sheets?.[0]?.properties?.title || "Sheet1";

  // 2. Fetch all rows from the sheet
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName}'!A1:Z`,
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) {
    return [];
  }

  // 3. Extract and match header columns dynamically
  const headers = rows[0].map((h: unknown) =>
    typeof h === "string" ? h.trim() : ""
  );

  const findColIndex = (...patterns: RegExp[]) => {
    for (const pattern of patterns) {
      const idx = headers.findIndex((h: string) => pattern.test(h));
      if (idx !== -1) return idx;
    }
    return -1;
  };

  const nameIdx = findColIndex(/^project$/i, /project\s*name/i, /^title$/i);
  const teamIdx = findColIndex(/^team$/i, /^creator$/i, /^author$/i, /^builder/i);
  const sourceIdx = findColIndex(/source\s*url/i, /github/i, /^repo/i);
  const liveUrlIdx = findColIndex(/project\s*url/i, /^demo/i, /^live/i);
  const descIdx = findColIndex(/^desscription$/i, /^description$/i, /^desc/i, /^about/i);
  const featuredIdx = findColIndex(/^featured$/i);
  const tagsIdx = findColIndex(/^tags?$/i, /^stack$/i, /^tech/i, /^technologies$/i);

  // 4. Map rows to SheetProject objects
  const projects: SheetProject[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const name = (nameIdx !== -1 ? row[nameIdx] : row[0])?.toString().trim();
    if (!name) continue; // Skip empty rows

    const creator =
      (teamIdx !== -1 ? row[teamIdx] : row[1])?.toString().trim() || "Anonymous";

    const github =
      (sourceIdx !== -1 ? row[sourceIdx] : row[4])?.toString().trim() || "#";

    const liveUrl =
      liveUrlIdx !== -1 && row[liveUrlIdx]
        ? row[liveUrlIdx].toString().trim()
        : undefined;

    const description =
      descIdx !== -1 && row[descIdx]
        ? row[descIdx].toString().trim()
        : undefined;

    const featuredRaw =
      featuredIdx !== -1 && row[featuredIdx]
        ? row[featuredIdx].toString().trim().toUpperCase()
        : "NO";

    const isFeatured = featuredRaw === "YES";

    // Tags: extract from tag column if available, or generate sensible default
    let tags: string[] = [];
    if (tagsIdx !== -1 && row[tagsIdx]) {
      const rawTags = row[tagsIdx].toString();
      tags = rawTags
        .split(/[,;|]/)
        .map((t: string) => t.trim())
        .filter(Boolean);
    }
    if (tags.length === 0) {
      tags = ["MediaPipe", "Gesture AI"];
    }

    projects.push({
      name,
      creator,
      github,
      liveUrl,
      description,
      tags,
      featured: isFeatured,
    });
  }

  return projects;
}

/**
 * Fetches only featured projects (Featured = YES), limited to a maximum count (default 3)
 */
export async function getFeaturedProjects(limit: number = 3): Promise<SheetProject[]> {
  const allProjects = await fetchAllProjectsFromSheet();
  const featuredProjects = allProjects.filter((p) => p.featured);
  return featuredProjects.slice(0, limit);
}
