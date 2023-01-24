/*
  Warnings:

  - Added the required column `elapsedTime` to the `TaskAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `TaskAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAIL');

-- AlterTable
ALTER TABLE "TaskAttempt" ADD COLUMN     "elapsedTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "AttemptStatus" NOT NULL;

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirement" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);
