import { github, lucia } from "@/utils/lucia";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "@/utils/db";
import type { GithubOAuthUser } from "@/utils/types";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	const storedState = cookies().get("state")?.value;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUser = await fetchGithubUser(tokens.accessToken);

		const existingAccount = await db.account.findUnique({
			where: {
				provider: "github",
				providerUserId: githubUser.id.toString(),
			},
		});

		if (existingAccount) {
			const session = await lucia.createSession(existingAccount.userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/",
				},
			});
		}

		const userId = generateId(15);

		// Replace this with your own DB client.

		await db.user.create({
			data: {
				id: userId,
				githubId: githubUser.login,
				name: githubUser.name,
				email: githubUser.email,
				avatar: githubUser.avatar_url,
			},
		});

		await db.account.create({
			data: {
				id: generateId(15),
				userId,
				provider: "github",
				providerUserId: githubUser.id.toString(),
				providerAccessToken: tokens.accessToken,
				providerRefreshToken: "",
				profileMeta: JSON.stringify(githubUser),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
			},
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
}

const fetchGithubUser = async (accessToken: string) => {
	const response = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return (await response.json()) as GithubOAuthUser;
};
