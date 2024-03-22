import { generateState } from "arctic";
import { github } from "@/utils/lucia";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();
	const url = await github.createAuthorizationURL(state, {
		scopes: ["user:email"],
	});

	cookies().set("state", state, {
		secure: true,
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10,
	});

	return Response.redirect(url);
}
