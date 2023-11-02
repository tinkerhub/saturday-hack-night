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
  title: string;
  description: string;
  image: string;
  details: string;
  date: Date;
  location: string;
  status: string;
  projects: number;
  created_at: Date;
};

export type Team = {
  id: string;
  name: string;
  repo: string;
  eventId: string;
  pitchStatus: string;
  projectStatus: string;
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
