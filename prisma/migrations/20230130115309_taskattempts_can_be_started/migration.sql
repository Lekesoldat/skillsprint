/*
  Warnings:

  - Changed the type of `elapsedTime` on the `TaskAttempt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TaskAttempt" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "elapsedTime",
ADD COLUMN     "elapsedTime" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
