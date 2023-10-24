/*
  Warnings:

  - You are about to drop the column `ourhook` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `yourhook` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "ourhook",
DROP COLUMN "yourhook",
ADD COLUMN     "project_url" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "webhook" TEXT NOT NULL DEFAULT '';
