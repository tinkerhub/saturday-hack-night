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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query;

  try {
    const fetchPromises = districts.map(async (district) => {
      const response = await fetch(`https://us-central1-saturday-hack-night.cloudfunctions.net/getColleges?district=${district}`);
      return response.json();
    });

    const results = await Promise.all(fetchPromises);
    let colleges = results.flat();

    colleges = colleges
      .filter((college) => college.label.toLowerCase().includes((search as string).toLowerCase()))
      .slice(0, 9);

    colleges.push({
      label: "Other",
      value: "Other",
    });

    // Set response headers and send the optimized response
    res.setHeader("Cache-Control", "s-maxage=86400");
    res.status(200).json(colleges.map(({ label, value }) => ({ label, value })));
  } catch (e) {
    console.error('Error fetching data:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
