/*
  Warnings:

  - You are about to drop the column `approvedAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `approvedBy` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "approvedAt",
DROP COLUMN "approvedBy",
ADD COLUMN     "approved_at" TIMESTAMP(3);
