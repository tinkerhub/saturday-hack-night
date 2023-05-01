/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `College` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "College_name_key";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "completionTime" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "College_id_key" ON "College"("id");
