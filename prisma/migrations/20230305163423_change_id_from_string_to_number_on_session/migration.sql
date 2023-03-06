/*
  Warnings:

  - The primary key for the `Participation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `session_id` on the `Participation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_session_id_fkey";

-- AlterTable
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_pkey",
DROP COLUMN "session_id",
ADD COLUMN     "session_id" INTEGER NOT NULL,
ADD CONSTRAINT "Participation_pkey" PRIMARY KEY ("user_id", "session_id");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
