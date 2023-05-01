/*
  Warnings:

  - You are about to drop the column `notes` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `collegeId` on the `TeamMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_collegeId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "notes",
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "completionTime" TEXT NOT NULL DEFAULT 'ONTIME';

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "collegeId";
