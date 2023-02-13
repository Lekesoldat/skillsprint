/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `nextTaskId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TaskAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `elapsedTime` on the `TaskAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `TaskAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TaskAttempt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[next_task_id]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task_id` to the `TaskAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `TaskAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_nextTaskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskAttempt" DROP CONSTRAINT "TaskAttempt_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskAttempt" DROP CONSTRAINT "TaskAttempt_userId_fkey";

-- DropIndex
DROP INDEX "Task_nextTaskId_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "categoryId",
DROP COLUMN "nextTaskId",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "next_task_id" TEXT;

-- AlterTable
ALTER TABLE "TaskAttempt" DROP COLUMN "createdAt",
DROP COLUMN "elapsedTime",
DROP COLUMN "taskId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "elapsed_time" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "task_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Task_next_task_id_key" ON "Task"("next_task_id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_next_task_id_fkey" FOREIGN KEY ("next_task_id") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAttempt" ADD CONSTRAINT "TaskAttempt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAttempt" ADD CONSTRAINT "TaskAttempt_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
