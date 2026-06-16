function ApplicationCard({

  application,

}) {

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

          md:flex-row

          md:justify-between

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

            {

              application.opportunity

                ?.title

            }

          </h2>

          <p

            className="

              text-gray-500

              mt-1

            "

          >

            {

              application.opportunity

                ?.organization

                ?.organizationName

            }

          </p>

        </div>

        <div>

          <span

            className="

              bg-secondary/10

              text-secondary

              px-4

              py-2

              rounded-full

              font-medium

            "

          >

            {

              application.applicationStatus

            }

          </span>

        </div>

      </div>

      <div

        className="

          mt-4

          text-gray-600

        "

      >

        {

          application.opportunity

            ?.description

        }

      </div>

      <div

        className="

          mt-4

          text-sm

          text-gray-500

        "

      >

        Applied:

        {" "}

        {

          new Date(

            application.appliedAt

          ).toLocaleDateString()

        }

      </div>

    </div>

  );

}

export default ApplicationCard;