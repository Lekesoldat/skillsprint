-- CreateEnum
CREATE TYPE "AchievementColor" AS ENUM ('GREEN', 'BLUE', 'RED', 'PINK', 'YELLOW', 'PURPLE', 'GRAY', 'LIGHTGRAY', 'ORANGE');

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "color" "AchievementColor" NOT NULL DEFAULT 'PINK';
