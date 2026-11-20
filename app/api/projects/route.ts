import { NextRequest, NextResponse } from "next/server";
import { getFeaturedProjects, fetchAllProjectsFromSheet } from "@/lib/googleSheets";

// Ensure this route handler is evaluated dynamically on every request
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchAll = searchParams.get("all") === "true";
    const limit = parseInt(searchParams.get("limit") || "3", 10);

    const projects = fetchAll
      ? await fetchAllProjectsFromSheet()
      : await getFeaturedProjects(isNaN(limit) ? 3 : limit);

    return NextResponse.json(
      {
        success: true,
        count: projects.length,
        projects,
        data: projects, // Alias for convenience
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch projects from Google Sheets";

    console.error("API error in /api/projects:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        projects: [],
        data: [],
      },
      {
        status: 500,
      }
    );
  }
}
