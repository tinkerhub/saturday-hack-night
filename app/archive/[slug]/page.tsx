import { notFound } from "next/navigation";
import { pastHackNights } from "@/lib/data";
import HackNightDetailClient from "./HackNightDetailClient";

export function generateStaticParams() {
  return pastHackNights.map((night) => ({ slug: night.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function HackNightPage({ params }: PageProps) {
  const { slug } = await params;
  const night = pastHackNights.find((n) => n.slug === slug);
  if (!night) notFound();
  return <HackNightDetailClient night={night} />;
}

