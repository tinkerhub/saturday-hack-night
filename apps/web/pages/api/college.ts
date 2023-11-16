import { NextApiRequest, NextApiResponse } from "next";

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

  let colleges: Array<{ label: string; value: string }> = [];

  for (let i = 0; i < districts.length; i++) {
    const res = await (
      await fetch(
        `https://us-central1-saturday-hack-night.cloudfunctions.net/getColleges?district=${districts[i]}`,
      )
    ).json();

    colleges.push(...res);
  }

  colleges = colleges.filter((college) =>
    college.label.toLowerCase().includes((search as string).toLowerCase()),
  );

  res.setHeader("Cache-Control", "s-maxage=86400");
  res.status(200).json(colleges);
}
