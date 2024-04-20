import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string(),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
	GITHUB_REDIRECT_URL: z.string(),
	NODE_ENV: z.string(),
	SMTP_HOST: z.string(),
	SMTP_PORT: z.string(),
	SMTP_USER: z.string(),
	SMTP_PASS: z.string(),
	SMTP_FROM: z.string(),
	CLIENT_BASE_URL: z.string(),
});

export const env = envSchema.safeParse(process.env);
