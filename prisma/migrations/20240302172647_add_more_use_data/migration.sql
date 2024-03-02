/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" VARCHAR,
ADD COLUMN     "collegeId" VARCHAR,
ADD COLUMN     "email" VARCHAR NOT NULL,
ADD COLUMN     "githubId" VARCHAR,
ADD COLUMN     "mobile" VARCHAR,
ADD COLUMN     "name" VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE SET NULL ON UPDATE CASCADE;
