/*
  Warnings:

  - You are about to drop the column `workflow_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Workflow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_workflow_id_fkey";

-- DropIndex
DROP INDEX "Project_workflow_id_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "workflow_id",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "nodes" TEXT,
ADD COLUMN     "ourhook" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "yourhook" TEXT;

-- DropTable
DROP TABLE "Workflow";
