/*
  Warnings:

  - You are about to drop the `Teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeamsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_eventid_fkey";

-- DropForeignKey
ALTER TABLE "_TeamsToUser" DROP CONSTRAINT "_TeamsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamsToUser" DROP CONSTRAINT "_TeamsToUser_B_fkey";

-- DropTable
DROP TABLE "Teams";

-- DropTable
DROP TABLE "_TeamsToUser";

-- CreateTable
CREATE TABLE "Team" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "eventid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamToUser" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "_TeamToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToUser_B_index" ON "_TeamToUser"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
