import { useState } from "react";

import {
  CheckCircleIcon,
  XCircleIcon,
  CalendarDaysIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

import {
  approveEvent,
  rejectEvent,
} from "../../api/eventApi";

import toast from "react-hot-toast";

function PendingEventCard({
  event,
  onAction,
}) {

  const [
    processing,
    setProcessing,
  ] = useState(false);

  const handleApprove =
    async () => {

      try {

        setProcessing(true);

        await approveEvent(
          event.id
        );

        toast.success(
          "Event approved successfully"
        );

        await onAction();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data?.message ||
          "Failed to approve event"
        );

      } finally {

        setProcessing(false);
      }
    };

  const handleReject =
    async () => {

      try {

        setProcessing(true);

        await rejectEvent(
          event.id
        );

        toast.success(
          "Event rejected successfully"
        );

        await onAction();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data?.message ||
          "Failed to reject event"
        );

      } finally {

        setProcessing(false);
      }
    };

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-lg
        transition
        duration-300
        p-6
        border
        border-gray-100
      "
    >

      <div
        className="
          flex
          justify-between
          items-start
          gap-4
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-primary
            "
          >
            {event.title}
          </h2>

          <span
            className="
              inline-block
              mt-2
              px-3
              py-1
              rounded-full
              bg-yellow-100
              text-yellow-700
              text-xs
              font-medium
            "
          >
            Pending Approval
          </span>

        </div>

      </div>

      <p
        className="
          mt-4
          text-gray-600
          leading-relaxed
        "
      >
        {event.description}
      </p>

      <div
        className="
          mt-6
          space-y-3
          text-sm
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            text-gray-700
          "
        >
          <BuildingOfficeIcon
            className="w-5 h-5"
          />

          <span>
            {
              event.organization
                ?.organizationName
            }
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            text-gray-700
          "
        >
          <MapPinIcon
            className="w-5 h-5"
          />

          <span>
            {event.location}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            text-gray-700
          "
        >
          <CalendarDaysIcon
            className="w-5 h-5"
          />

          <span>
            {new Date(
              event.eventDate
            ).toLocaleString()}
          </span>
        </div>

        {event.category && (

          <div
            className="
              text-secondary
              font-medium
            "
          >
            Category:
            {" "}
            {
              event.category
                .categoryName
            }
          </div>

        )}

      </div>

      <div
        className="
          flex
          gap-4
          mt-8
        "
      >

        <button
          onClick={
            handleApprove
          }
          disabled={
            processing
          }
          className="
            flex
            items-center
            gap-2
            bg-secondary
            hover:bg-green-700
            disabled:opacity-50
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
            transition
          "
        >

          <CheckCircleIcon
            className="
              w-5
              h-5
            "
          />

          Approve

        </button>

        <button
          onClick={
            handleReject
          }
          disabled={
            processing
          }
          className="
            flex
            items-center
            gap-2
            bg-red-600
            hover:bg-red-700
            disabled:opacity-50
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
            transition
          "
        >

          <XCircleIcon
            className="
              w-5
              h-5
            "
          />

          Reject

        </button>

      </div>

    </div>
  );
}

export default PendingEventCard;