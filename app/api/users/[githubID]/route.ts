import { db } from "@/utils/db";
import { validateRequest } from "@/utils/lucia";
import type { NextRequest } from "next/server";

export async function GET(
	_request: NextRequest,
	{ params }: { params: { githubID: string } },
): Promise<Response> {
	const { session } = await validateRequest();

	if (!session) {
		return new Response(null, {
			status: 401,
			headers: {
				Location: "/auth/login",
			},
		});
	}

	const user = await db.user.findUnique({
		where: {
			githubId: params.githubID ?? "",
		},
		select: {
			githubId: true,
		},
	});
	return new Response(JSON.stringify(user), {
		status: user ? 200 : 404,
	});
}
