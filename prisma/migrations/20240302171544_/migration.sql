/*
  Warnings:

  - A unique constraint covering the columns `[providerUserId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider,userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_providerUserId_key" ON "Account"("providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_userId_key" ON "Account"("provider", "userId");
