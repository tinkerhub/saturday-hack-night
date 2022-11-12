/*
  Warnings:

  - The `mode` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pitchStatus` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `projectStatus` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TeamMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `role` column on the `TeamMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,activityId]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,teamId]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "mode",
ADD COLUMN     "mode" "ActivityMode" NOT NULL DEFAULT 'ONLINE',
DROP COLUMN "status",
ADD COLUMN     "status" "ActivityStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "pitchStatus",
ADD COLUMN     "pitchStatus" "PitchStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "projectStatus",
ADD COLUMN     "projectStatus" "ProjectStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_pkey",
DROP COLUMN "role",
ADD COLUMN     "role" "TeamMemberRole" NOT NULL DEFAULT 'MEMBER',
ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("userId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_userId_activityId_key" ON "TeamMember"("userId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_userId_teamId_key" ON "TeamMember"("userId", "teamId");
