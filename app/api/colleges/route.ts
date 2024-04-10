import { db } from "@/utils/db";
import { validateRequest } from "@/utils/lucia";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
	const { session } = await validateRequest();

	if (!session) {
		return new Response(null, {
			status: 401,
			headers: {
				Location: "/auth/login",
			},
		});
	}
	const params = request.nextUrl.searchParams;

	const searchItem = params.get("search");

	const colleges = await db.college.findMany({
		where: {
			name: {
				contains: searchItem ?? "",
				mode: "insensitive",
			},
		},
		select: {
			id: true,
			name: true,
		},
		take: 10,
	});

	return new Response(JSON.stringify(colleges), {});
}
