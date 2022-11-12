/*
  Warnings:

  - The `mode` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pitchStatus` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `projectStatus` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `activityId` on the `TeamMember` table. All the data in the column will be lost.
  - The `role` column on the `TeamMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_activityId_fkey";

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
ALTER TABLE "TeamMember" DROP COLUMN "activityId",
DROP COLUMN "role",
ADD COLUMN     "role" "TeamMemberRole" NOT NULL DEFAULT 'MEMBER';

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("userId","activityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_id_key" ON "Participant"("id");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
