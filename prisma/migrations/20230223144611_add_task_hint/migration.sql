-- CreateEnum
CREATE TYPE "TaskHint" AS ENUM ('MULTIPLE_VALUES', 'FUNCTION', 'DECIMAL', 'FLAG');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "hint" "TaskHint";
