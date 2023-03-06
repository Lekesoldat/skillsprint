-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "user_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("user_id","session_id")
);

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
