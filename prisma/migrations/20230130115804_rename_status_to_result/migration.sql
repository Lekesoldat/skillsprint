/*
  Warnings:

  - You are about to drop the column `status` on the `TaskAttempt` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AttemptResult" AS ENUM ('PENDING', 'SUCCESS', 'FAIL');

-- AlterTable
ALTER TABLE "TaskAttempt" DROP COLUMN "status",
ADD COLUMN     "result" "AttemptResult" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "elapsedTime" SET DEFAULT 0;

-- DropEnum
DROP TYPE "AttemptStatus";
