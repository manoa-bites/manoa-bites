-- CreateEnum
CREATE TYPE "Topic" AS ENUM ('bug', 'feature', 'wronginformation', 'other');

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "topic" "Topic" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);
