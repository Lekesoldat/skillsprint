/*
  Warnings:

  - You are about to drop the `Participation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_session_id_fkey";

-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "session" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "Participation";

-- DropTable
DROP TABLE "Session";
