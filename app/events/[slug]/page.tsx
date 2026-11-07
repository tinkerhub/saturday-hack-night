import { notFound } from "next/navigation";
import { upcomingNights } from "@/lib/data";
import EventDetailClient from "./EventDetailClient";
import MediaPipeLearnClient from "@/components/learn/MediaPipeLearnClient";

export function generateStaticParams() {
  return upcomingNights.filter((n) => !n.locked).map((night) => ({ slug: night.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const night = upcomingNights.find((n) => n.slug === slug);
  if (!night || night.locked) notFound();

  if (night.slug === "shn-s2-001-beyond-gesture" || night.stack === "MediaPipe") {
    return <MediaPipeLearnClient />;
  }

  return <EventDetailClient night={night} />;
}

