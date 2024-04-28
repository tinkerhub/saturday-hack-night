import type { User } from "lucia";
import { db } from "./db";
import { EventStatus } from "./types";

export const getCurrentEvent = async (user: User | null) => {
	const currentEvent = await db.event.findFirst({
		where: {
			status: {
				in: [EventStatus.ACTIVE, EventStatus.REGISTRATION],
			},
		},
		select: {
			id: true,
			title: true,
			date: true,
			image: true,
			imageWhite: true,
			location: true,
			description: true,
			details: true,
			status: true,
			_count: {
				select: {
					teams: true,
				},
			},
		},
	});

	if (currentEvent && user) {
		const registeredTeam = await db.team.findFirst({
			select: {
				id: true,
				name: true,
				eventId: true,
				members: {
					select: {
						userId: true,
						user: {
							select: {
								githubId: true,
							},
						},
						role: true,
					},
				},
				repo: true,
			},
			where: {
				eventId: currentEvent.id,
				members: {
					some: {
						userId: user.id,
					},
				},
			},
		});
		return {
			event: currentEvent,
			team: registeredTeam,
		};
	}
	return {
		event: currentEvent,
		team: null,
	};
};

export const getEvents = async () => {
	const events = await db.event.findMany({
		where: {
			status: "RESULTS",
		},
		select: {
			id: true,
			title: true,
			date: true,
			image: true,
			status: true,
			description: true,
			details: true,
			_count: {
				select: {
					teams: true,
				},
			},
		},
	});

	return events;
};
