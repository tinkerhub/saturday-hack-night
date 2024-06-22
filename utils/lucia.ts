import type { User as DBUser } from "@prisma/client";
import { Lucia, type Session, type User, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { GitHub } from "arctic";
import { cache } from "react";
import { cookies } from "next/headers";
import { db } from "@/utils/db";
import { env } from "@/utils/config";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(8, "d"),
	sessionCookie: {
		expires: true,
		attributes: {
			secure: env.NODE_ENV === "production",
			sameSite: "strict",
			domain:
				env.NODE_ENV === "production"
					? new URL(env.NEXT_PUBLIC_BASE_URL).hostname
					: undefined,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			...attributes,
			// Add custom attributes here
		};
	},
});

export const github = new GitHub(
	env.GITHUB_CLIENT_ID,
	env.GITHUB_CLIENT_SECRET,
	{
		redirectURI: env.GITHUB_REDIRECT_URL,
	},
);

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session?.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
		} catch {
			console.log("Error setting cookie");
		}
		return result;
	},
);

export const logout = async () => {
	const sessionCookie = await lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
};

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DBUser;
	}
}
