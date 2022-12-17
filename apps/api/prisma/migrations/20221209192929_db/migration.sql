/*
  Warnings:

  - The `mode` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pitchStatus` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `projectStatus` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `TeamMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "mode",
ADD COLUMN     "mode" "ActivityMode" NOT NULL DEFAULT 'ONLINE',
DROP COLUMN "status",
ADD COLUMN     "status" "ActivityStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "pitchStatus",
ADD COLUMN     "pitchStatus" "PitchStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "projectStatus",
ADD COLUMN     "projectStatus" "ProjectStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "role",
ADD COLUMN     "role" "TeamMemberRole" NOT NULL DEFAULT 'MEMBER';
