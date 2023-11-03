import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  githubID: string;
  name?: string;
  phno?: string;
  avatar: string;
  district?: string;
  campusID?: string;
  campusName?: string;
};

export type College = {
  id: string;
  name: string;
};

export type Child = {
  children: React.ReactNode;
};

export type Event = {
  id: string;
  name: string;
  about: string;
  image: string;
  imageWhite: string;
  moreInfo: string;
  projectCount: number;
  time: Timestamp;
  location: string;
  status: string;
};

export type Team = {
  id: string;
  name: string;
  repo: string;
  eventId: string;
  pitchStatus: string;
  status: string;
  created_at: Date;
};

export interface UserPoints {
  id: string;
  name: string;
  points: number;
  githubid: string;
  avatar: string;
  college: string;
}

export interface CampusPoints {
  id: string;
  name: string;
  points: number;
}
