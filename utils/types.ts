import type { Team, Event } from "@prisma/client";
import type { User } from "lucia";
export interface GithubOAuthUser {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	gist_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string;
	company: string;
	blog: string;
	location: string;
	email: string;
	hireable: boolean;
	bio: string;
	twitter_username: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

export interface CurrentEvent {
	id: string;
	title: string;
	description: string;
	image: string;
	imageWhite: string;
	details: string;
	date: Date;
	location: string;
	status: string | null;
	_count: {
		teams: number;
	};
}

export interface RegisteredTeam {
	id: string;
	repo: string;
	eventId: string;
	members: {
		role: string | null;
		userId: string;
	}[];
}

export enum ProjectStatus {
	PENDING = "PENDING",
	COMPLETED = "COMPLETED",
	DROPPED = "DROPPED",
	BEST_PROJECT = "BEST PROJECT",
}

export enum ProjectCompletionTime {
	ONTIME = "ONTIME",
	DELAYED = "DELAYED",
	PENDING = "PENDING",
}

export enum ProjectPitchStatus {
	PENDING = "PENDING",
	COMPLETED = "COMPLETED",
	ABSENT = "ABSENT",
}

export enum EventStatus {
	PENDING = "PENDING",
	ACTIVE = "ACTIVE",
	RESULTS = "RESULTS",
	REGISTRATION = "REGISTRATION",
}

export enum TeamMemberRole {
	LEADER = "LEADER",
	MEMBER = "MEMBER",
}

export type ExtractedTeamType = Pick<Team, "name" | "id" | "projectStatus" | 'repo'> & {
	members: {
		user: Pick<User, "avatar" | "name" | "githubId">;
	}[];
};

export type ProjectResults = {
	projects: ExtractedTeamType[];
	event: Event;
};
