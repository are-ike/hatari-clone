-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_workflow_id_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "workflow_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE SET NULL ON UPDATE CASCADE;
