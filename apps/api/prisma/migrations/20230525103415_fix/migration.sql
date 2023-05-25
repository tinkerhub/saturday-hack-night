-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "id" SET DEFAULT (gen_random_uuid())::uuid;

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "id" SET DEFAULT (gen_random_uuid())::uuid;

-- AlterTable
ALTER TABLE "Points" ALTER COLUMN "id" SET DEFAULT (gen_random_uuid())::uuid;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "id" SET DEFAULT (gen_random_uuid())::uuid;

-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "id" SET DEFAULT (gen_random_uuid())::uuid;
