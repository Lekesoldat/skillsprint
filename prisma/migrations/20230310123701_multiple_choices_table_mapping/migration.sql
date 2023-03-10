/*
  Warnings:

  - You are about to drop the column `multipleChoices` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "multipleChoices",
ADD COLUMN     "multiple_choices" TEXT;
