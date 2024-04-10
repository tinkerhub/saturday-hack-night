"use server";

import { sendEmail } from "@/emails";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

import { schema } from "@/app/events/ui/modal/CreateTeamModal";
import type { z } from "zod";

export type FormData = z.infer<typeof schema>;

export default async function createTeam(
	userId: string,
	eventId: string | null,
	formData: FormData,
) {
	if (!eventId) {
		return "Invalid Event ID";
	}

	schema.safeParse(formData);

    console.log("Creating team");

	const team = await db.$transaction(async (tx) => {
		const team = await tx.team.create({
			data: {
				name: formData.name,
				repo: formData.repo,
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
			data: formData.members.map((member) => ({
				userId: member,
				teamId: team.id,
				eventId: eventId,
				role: "MEMBER",
			})),
		});
		return team;
	});

	const admin = await db.user.findUnique({
		where: {
			id: userId,
		},
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
	return "Profile updated successfully";
}
