import toast from "react-hot-toast";

import {
  updateApplicationStatus,
} from "../../api/applicationApi";

function ApplicantCard({

  applicant,

  onUpdate,

}) {

  const handleStatus =
    async (
      status
    ) => {

      try {

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
          "Failed to update application"
        );

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
          justify-between
          items-start
          gap-6
          flex-wrap
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

            {

              applicant.student.user.fullName

            }

          </h2>

          <p
            className="
              text-gray-600
              mt-2
            "
          >

            {

              applicant.student.user.email

            }

          </p>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            Applied:

            {" "}

            {

              new Date(

                applicant.appliedAt

              ).toLocaleDateString()

            }

          </p>

          {

            applicant.cvUrl && (

              <a

                href={
                  applicant.cvUrl
                }

                target="_blank"

                rel="noreferrer"

                className="
                  inline-block
                  mt-4
                  text-secondary
                  font-semibold
                "

              >

                View CV

              </a>

            )

          }

        </div>

        <div
          className="
            flex
            flex-col
            gap-3
          "
        >

          <span

            className="
              px-4
              py-2
              rounded-full
              bg-gray-100
              text-center
              font-semibold
            "

          >

            {

              applicant.applicationStatus

            }

          </span>

          <button

            onClick={() =>

              handleStatus(
                "REVIEWING"
              )

            }

            className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-4
              py-2
              rounded-xl
            "

          >

            Reviewing

          </button>

          <button

            onClick={() =>

              handleStatus(
                "ACCEPTED"
              )

            }

            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-2
              rounded-xl
            "

          >

            Accept

          </button>

          <button

            onClick={() =>

              handleStatus(
                "REJECTED"
              )

            }

            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-4
              py-2
              rounded-xl
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