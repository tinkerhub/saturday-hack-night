"use server";

import { sendEmail } from "@/emails";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

import {
	updateTeamSchema,
	validateRequestSchemaAsync,
} from "@/utils/validateRequest";
import type { z } from "zod";

export type FormData = z.infer<typeof updateTeamSchema>;

export default async function updateTeam(
	userId: string,
	eventId: string | null,
	formData: FormData,
) {
	if (!eventId) {
		return "Invalid Event ID";
	}

	const validation = await validateRequestSchemaAsync(
		updateTeamSchema,
		formData,
		false,
	);

	if (validation instanceof Response || !validation.success) {
		if (validation instanceof Response) {
			return validation;
		}
		return;
	}

	const data = validation.data;

	const teamMember = await db.teamMember.findUnique({
		where: {
			userId: userId,
			eventId: eventId,
		},
	});

	const admin = await db.user.findUnique({
		where: {
			id: userId,
		},
	});

	const userIDs = await db.user.findMany({
		where: {
			githubId: {
				in: data.members,
			},
		},
		select: {
			githubId: true,
			id: true,
		},
	});

	const [team, members] = await db.$transaction(async (tx) => {
		const team = await tx.team.create({
			data: {
				name: data.name,
				repo: data.repo,
				members: {
					create: {
						userId: userId,
						eventId: eventId,
						role: "LEADER",
					},
				},
				event: {
					connect: {
						id: eventId,
					},
				},
			},
		});
		await tx.invite.createMany({
			data: data.members.map((member) => ({
				userId:
					userIDs.find(
						(user) => user.githubId.toLowerCase() === member.toLowerCase(),
					)?.id || "",
				teamId: team.id,
				eventId: eventId,
				role: "MEMBER",
			})),
		});

		const members = await db.invite.findMany({
			where: {
				teamId: team.id,
			},
			select: {
				id: true,
				user: {
					select: {
						email: true,
					},
				},
			},
		});
		return [team, members];
	});

	const mails = [];

	mails.push(
		sendEmail(
			"CreateTeam",
			{
				teamID: team.id,
			},
			"Welcome to this week's Saturday Hack Night! 🎉",
			admin?.email || "",
		),
	);

	for (const member of members) {
		mails.push(
			sendEmail(
				"Invite",
				{
					inviteCode: member.id,
					lead: admin?.name || "",
					teamName: team.name,
					teamID: team.id,
				},
				"You've been added to a team! 🚀",
				member.user.email,
			),
		);
	}

	await Promise.all(mails);

	revalidatePath("/events");
	return "Team created successfully! 🎉";
}
