import { db } from "@/utils/db";
import { EventStatus, ProjectStatus } from "@/utils/types";
import {
	getResultsParamsSchema,
	validateRequest,
} from "@/utils/validateRequest";
import type { NextRequest } from "next/server";

export async function GET(
	_request: NextRequest,
	{ params }: { params: { eventID: string } },
): Promise<Response> {
	const data = validateRequest(getResultsParamsSchema, params);
	if (data instanceof Response) return data;

	const event = await db.event.findUnique({
		where: {
			id: data.eventID,
			status: EventStatus.RESULTS,
		},
	});

	if (!event) {
		return new Response("Event not found", { status: 404 });
	}

	const projects = await db.team.findMany({
		where: {
			eventId: data.eventID,
			projectStatus: {
				in: [ProjectStatus.COMPLETED, ProjectStatus.BEST_PROJECT],
			},
		},
		select: {
			id: true,
			name: true,
			projectStatus: true,
			repo: true,
			members: {
				select: {
					user: {
						select: {
							name: true,
							avatar: true,
							githubId: true,
						},
					},
				},
			},
		},
	});

	return new Response(
		JSON.stringify({
			event,
			projects,
		}),
	);
}
