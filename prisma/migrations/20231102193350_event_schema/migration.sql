/*
  Warnings:

  - You are about to drop the column `amount` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `card_type` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `gateway` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `last_4_digits` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_type` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Event` table. All the data in the column will be lost.
  - Added the required column `data` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "amount",
DROP COLUMN "card_type",
DROP COLUMN "country",
DROP COLUMN "currency",
DROP COLUMN "gateway",
DROP COLUMN "last_4_digits",
DROP COLUMN "transaction_id",
DROP COLUMN "transaction_type",
DROP COLUMN "user",
ADD COLUMN     "data" TEXT NOT NULL;
