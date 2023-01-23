grant usage on schema public to postgres,
    anon,
    authenticated,
    service_role;
grant all privileges on all tables in schema public to postgres,
    anon,
    authenticated,
    service_role;
grant all privileges on all functions in schema public to postgres,
    anon,
    authenticated,
    service_role;
grant all privileges on all sequences in schema public to postgres,
    anon,
    authenticated,
    service_role;
alter default privileges in schema public
grant all on tables to postgres,
    anon,
    authenticated,
    service_role;
alter default privileges in schema public
grant all on functions to postgres,
    anon,
    authenticated,
    service_role;
alter default privileges in schema public
grant all on sequences to postgres,
    anon,
    authenticated,
    service_role;
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
-- AddForeignKey
ALTER TABLE "Task"
ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;