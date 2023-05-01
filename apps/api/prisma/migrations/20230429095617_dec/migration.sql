-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "collegeId" TEXT;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE SET NULL ON UPDATE CASCADE;
