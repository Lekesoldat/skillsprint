/*
  Warnings:

  - A unique constraint covering the columns `[nextTaskId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answer` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "nextTaskId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Task_nextTaskId_key" ON "Task"("nextTaskId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_nextTaskId_fkey" FOREIGN KEY ("nextTaskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
