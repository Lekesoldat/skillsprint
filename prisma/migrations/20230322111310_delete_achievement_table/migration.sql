/*
  Warnings:

  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AchievementProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AchievementProgress" DROP CONSTRAINT "AchievementProgress_achievement_id_fkey";

-- DropForeignKey
ALTER TABLE "AchievementProgress" DROP CONSTRAINT "AchievementProgress_user_id_fkey";

-- DropTable
DROP TABLE "Achievement";

-- DropTable
DROP TABLE "AchievementProgress";

-- DropEnum
DROP TYPE "AchievementColor";

-- DropEnum
DROP TYPE "AchievementType";
