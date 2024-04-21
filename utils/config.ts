import * as zod from "zod";

const envSchema = zod.object({
	DATABASE_URL: zod.string(),
	GITHUB_CLIENT_ID: zod.string(),
	GITHUB_CLIENT_SECRET: zod.string(),
	GITHUB_REDIRECT_URL: zod.string(),
	NODE_ENV: zod.string(),
	SMTP_HOST: zod.string(),
	SMTP_PORT: zod.string(),
	SMTP_USER: zod.string(),
	SMTP_PASS: zod.string(),
	SMTP_FROM: zod.string(),
	NEXT_PUBLIC_BASE_URL: zod.string(),
});

const validatedEnv = envSchema.safeParse(process.env);

if (!validatedEnv.success) {
	console.log(validatedEnv.error);
	throw new Error(validatedEnv.error.message);
}

export const env = validatedEnv.data;
