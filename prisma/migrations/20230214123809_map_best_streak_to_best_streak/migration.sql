/*
  Warnings:

  - You are about to drop the column `bestStreak` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bestStreak",
ADD COLUMN     "best_streak" INTEGER NOT NULL DEFAULT 0;
