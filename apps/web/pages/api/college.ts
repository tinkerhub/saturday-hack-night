import { getRedisValue, setRedisValue } from "@app/utils/redis";
import { NextApiRequest, NextApiResponse } from "next";
import Fuse from "fuse.js";

const CACHE_EXPIRATION_TIME = 604800; // 7 days in seconds

const districts = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Wayanad",
  "Kozhikode",
  "Kannur",
  "Kasaragod",
  "Other",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { search } = req.query;

  const cacheKey = generateCacheKey(search as string);

  const cachedDataJSON = await getRedisValue(cacheKey);
  let cachedData;

  if (cachedDataJSON) {
    try {
      cachedData = JSON.parse(cachedDataJSON);
      const isCachedDataValid =
        Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME * 1000; // Convert seconds to milliseconds
      if (isCachedDataValid) {
        // Return cached data
        res.setHeader("Cache-Control", "s-maxage=86400");
        res.setHeader("X-Cached-Data", "true");
        return res.json(cachedData.data);
      }
    } catch (error) {
      // Cached data is invalid, discard it
      cachedData = null;
    }
  }

  // Fetch data from Firebase if cache is not valid
  const colleges = await fetchCollegesData(search as string);

  // Cache updated data for 24 hours using the specific search query key
  await setRedisValue(
    cacheKey,
    JSON.stringify({ data: colleges, timestamp: Date.now() }),
  );

  // Set response headers and send the optimized response
  res.setHeader("Cache-Control", "s-maxage=86400");
  res.setHeader("X-Cached-Data", "false");

  res.status(200).json(
    colleges.map(({ label, value }: { label: string; value: string }) => ({
      label,
      value,
    })),
  );
}

function generateCacheKey(search: string | undefined): string {
  return `colleges-${search || "all"}`;
}

async function fetchCollegesData(search: string | undefined) {
  const baseData = await getRedisValue("colleges-all");
  let cachedData;
  if (baseData) {
    try {
      cachedData = JSON.parse(baseData);
      const isCachedDataValid =
        Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME * 1000; // Convert seconds to milliseconds
      if (isCachedDataValid) {
        const fuse = new Fuse(cachedData.data ?? [], {
          keys: ["label"],
          ignoreLocation: true,
          isCaseSensitive: false,
          shouldSort: true,
        });

        const result = fuse.search(search ?? "");

        const matchedColleges = result.map((item) => item.item);

        matchedColleges.push({
          label: "Other",
          value: "Other",
        });
        return matchedColleges;
      }
    } catch (error) {
      cachedData = null;
    }
  }

  const fetchPromises = districts.map(async (district) => {
    const response = await fetch(
      `https://us-central1-saturday-hack-night.cloudfunctions.net/getColleges?district=${district}`,
    );
    return response.json();
  });

  const results = await Promise.all(fetchPromises);
  let colleges = results.flat();

  setRedisValue(
    "colleges-all",
    JSON.stringify({ data: colleges, timestamp: Date.now() }),
  );

  const fuse = new Fuse(colleges ?? [], {
    keys: ["label"],
    ignoreLocation: true,
    isCaseSensitive: false,
    shouldSort: true,
  });

  const result = fuse.search(search ?? "");

  const matchedColleges = result.map((item) => item.item);

  matchedColleges.push({
    label: "Other",
    value: "Other",
  });

  return matchedColleges;
}
