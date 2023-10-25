-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "action" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;
