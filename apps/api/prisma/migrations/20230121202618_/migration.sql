/*
  Warnings:

  - Added the required column `activityId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "activityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
