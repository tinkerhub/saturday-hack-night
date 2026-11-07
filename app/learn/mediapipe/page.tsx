import type { Metadata } from "next";
import MediaPipeLearnClient from "@/components/learn/MediaPipeLearnClient";

export const metadata: Metadata = {
  title: "MediaPipe Learning Hub — Saturday Hack Night | TinkerHub",
  description:
    "Master MediaPipe and Computer Vision at the edge for Saturday Hack Night. Learn 21-hand landmark detection, 468-point face meshes, body pose estimation, and build real-time gesture projects.",
  keywords: [
    "MediaPipe",
    "Computer Vision",
    "Gesture Recognition",
    "Hand Landmarks",
    "OpenCV",
    "Python",
    "Saturday Hack Night",
    "TinkerHub",
    "Edge AI",
  ],
  openGraph: {
    title: "MediaPipe Learning Hub — Saturday Hack Night",
    description:
      "Master MediaPipe and Computer Vision at the edge. Real-time gesture tracking, face mesh, and pose estimation tutorials for builders.",
    type: "article",
    url: "https://shnwebsitedemo.vercel.app/learn/mediapipe/",
    siteName: "Saturday Hack Night",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediaPipe Learning Hub — Saturday Hack Night",
    description:
      "Master MediaPipe and Computer Vision at the edge. Real-time gesture tracking and project ideas for Saturday Hack Night.",
  },
};

export default function MediaPipeLearnPage() {
  return <MediaPipeLearnClient />;
}
