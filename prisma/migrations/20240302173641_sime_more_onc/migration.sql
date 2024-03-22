/*
  Warnings:

  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "githubId" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
