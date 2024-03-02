import * as zod from 'zod';

const envSchema = zod.object({
    DATABASE_URL: zod.string(),
    GITHUB_CLIENT_ID: zod.string(),
    GITHUB_CLIENT_SECRET: zod.string(),
    GITHUB_REDIRECT_URL: zod.string(),
})

export const env = envSchema.parse(process.env);