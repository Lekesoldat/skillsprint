-- CreateEnum
CREATE TYPE "AchievementColor" AS ENUM ('GREEN', 'BLUE', 'RED', 'LIGHTRED', 'YELLOW', 'PURPLE', 'GRAY', 'LIGHTGRAY');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('STREAK', 'SOLVED', 'CATEGORIES_ATTEMPTED', 'FULL_CATEGORY');

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" "AchievementColor" NOT NULL,
    "requirement" INTEGER NOT NULL DEFAULT 0,
    "type" "AchievementType" NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 200,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementProgress" (
    "user_id" TEXT NOT NULL,
    "achievement_id" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AchievementProgress_pkey" PRIMARY KEY ("user_id","achievement_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_title_key" ON "Achievement"("title");

-- AddForeignKey
ALTER TABLE "AchievementProgress" ADD CONSTRAINT "AchievementProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementProgress" ADD CONSTRAINT "AchievementProgress_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
