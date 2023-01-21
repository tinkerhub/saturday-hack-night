/*
  Warnings:

  - You are about to drop the column `inviteCode` on the `Team` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Team_inviteCode_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "inviteCode";

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_id_key" ON "Invite"("id");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
