/*
  Warnings:

  - A unique constraint covering the columns `[opportunity_id,student_id]` on the table `applications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[event_id,student_id]` on the table `event_registrations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('EVENT', 'OPPORTUNITY', 'SYSTEM');

-- AlterTable
ALTER TABLE "event_registrations" ALTER COLUMN "registration_status" SET DEFAULT 'APPROVED';

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "approved_at" TIMESTAMP(3),
ADD COLUMN     "status" "OpportunityStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "applications_opportunity_id_student_id_key" ON "applications"("opportunity_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_registrations_event_id_student_id_key" ON "event_registrations"("event_id", "student_id");
