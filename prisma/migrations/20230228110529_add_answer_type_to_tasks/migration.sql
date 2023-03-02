-- CreateEnum
CREATE TYPE "AnswerType" AS ENUM ('NORMAL', 'MULTIPLE_CHOICE', 'MULTIPLE_VALUES', 'FLAG', 'FUNCTION_ANSWER');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "answer_type" "AnswerType" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "placeholder" TEXT;
