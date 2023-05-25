/*
  Warnings:

  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "location" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "pitchStatus" SET DATA TYPE TEXT,
ALTER COLUMN "projectStatus" SET DATA TYPE TEXT,
ALTER COLUMN "completionTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "role" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET NOT NULL;
