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
});

export const env = envSchema.parse(process.env);
