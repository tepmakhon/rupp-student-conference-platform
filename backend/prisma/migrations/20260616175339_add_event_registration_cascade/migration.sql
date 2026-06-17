-- DropForeignKey
ALTER TABLE "event_registrations" DROP CONSTRAINT "event_registrations_event_id_fkey";

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
