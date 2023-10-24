/*
  Warnings:

  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nodes` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ourhook` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yourhook` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "nodes" SET NOT NULL,
ALTER COLUMN "ourhook" SET NOT NULL,
ALTER COLUMN "yourhook" SET NOT NULL;
