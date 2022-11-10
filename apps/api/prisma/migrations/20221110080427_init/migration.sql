-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(30) NOT NULL,
    "authid" TEXT,
    "githubid" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "campus" TEXT,
    "district" TEXT,
    "mobile" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_authid_key" ON "User"("authid");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubid_key" ON "User"("githubid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
