-- CreateEnum
CREATE TYPE "PitchStatus" AS ENUM ('PENDING', 'ABSENT', 'PRESENT');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING', 'WORKING', 'COMPLETED', 'DROP', 'BESTPROJECT');

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "pitchStatus" "PitchStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "projectStatus" "ProjectStatus" NOT NULL DEFAULT 'PENDING';
