import { useState } from "react";
import toast from "react-hot-toast";

import {
  updateApplicationStatus,
} from "../../api/applicationApi";

function ApplicantCard({
  applicant,
  onUpdate,
}) {

  const [loading, setLoading] =
    useState(false);

  const profile =
    applicant.student?.user?.profile;

  const handleStatus =
    async (status) => {

      try {

        setLoading(true);

        await updateApplicationStatus(
          applicant.id,
          status
        );

        toast.success(
          `Application ${status.toLowerCase()}`
        );

        onUpdate();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data?.message ||
          "Failed to update application"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
      "
    >

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:justify-between
          lg:items-center
          gap-6
        "
      >

        <div
          className="
            flex
            items-start
            gap-5
          "
        >

          <img
            src={
              profile?.profileImageUrl ||
              "https://placehold.co/120x120?text=User"
            }
            alt="Applicant"
            className="
              w-20
              h-20
              rounded-full
              object-cover
            "
          />

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-primary
              "
            >
              {
                profile?.fullName ||
                applicant.student?.user?.email
              }
            </h2>

            <p
              className="
                text-gray-500
                mt-1
              "
            >
              {applicant.student?.user?.email}
            </p>

            <div
              className="
                mt-4
                text-sm
                text-gray-600
                space-y-2
              "
            >

              <p>
                <span className="font-semibold">
                  University:
                </span>{" "}
                {
                  applicant.student?.university
                    ?.universityName || "-"
                }
              </p>

              <p>
                <span className="font-semibold">
                  Faculty:
                </span>{" "}
                {
                  applicant.student?.faculty
                    ?.facultyName || "-"
                }
              </p>

              <p>
                <span className="font-semibold">
                  Major:
                </span>{" "}
                {
                  applicant.student?.major
                    ?.majorName || "-"
                }
              </p>

              <p>
                <span className="font-semibold">
                  Applied:
                </span>{" "}
                {
                  applicant.appliedAt
                    ? new Date(
                        applicant.appliedAt
                      ).toLocaleDateString()
                    : "-"
                }
              </p>

            </div>

          </div>

        </div>

        <div
          className="
            flex
            flex-wrap
            gap-3
            items-center
          "
        >

          <span
            className="
              px-4
              py-2
              rounded-full
              bg-gray-100
              text-gray-700
              font-medium
            "
          >
            {applicant.applicationStatus}
          </span>

          <button
            onClick={() =>
              handleStatus("REVIEWING")
            }
            disabled={loading}
            className="
              bg-yellow-500
              hover:bg-yellow-600
              text-white
              px-4
              py-2
              rounded-xl
              disabled:opacity-50
            "
          >
            Review
          </button>

          <button
            onClick={() =>
              handleStatus("ACCEPTED")
            }
            disabled={loading}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-2
              rounded-xl
              disabled:opacity-50
            "
          >
            Accept
          </button>

          <button
            onClick={() =>
              handleStatus("REJECTED")
            }
            disabled={loading}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-4
              py-2
              rounded-xl
              disabled:opacity-50
            "
          >
            Reject
          </button>

        </div>

      </div>

    </div>

  );

}

export default ApplicantCard;