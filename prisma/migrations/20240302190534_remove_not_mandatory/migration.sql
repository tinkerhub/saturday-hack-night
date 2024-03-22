/*
  Warnings:

  - Made the column `image` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageWhite` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `details` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "imageWhite" SET NOT NULL,
ALTER COLUMN "details" SET NOT NULL;
