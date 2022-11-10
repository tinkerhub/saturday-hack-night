-- CreateTable
CREATE TABLE "Event" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "projectCount" INTEGER NOT NULL DEFAULT 0,
    "registration" BOOLEAN NOT NULL DEFAULT false,
    "results" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "eventid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamsToUser" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teams_id_key" ON "Teams"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamsToUser_AB_unique" ON "_TeamsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamsToUser_B_index" ON "_TeamsToUser"("B");

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamsToUser" ADD CONSTRAINT "_TeamsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamsToUser" ADD CONSTRAINT "_TeamsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
