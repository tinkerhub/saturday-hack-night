/*
  Warnings:

  - The primary key for the `TeamMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `repo` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "location" DROP DEFAULT,
ALTER COLUMN "location" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "repo" SET NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_pkey",
ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id");
