import ApplicationCard

from "./ApplicationCard";

function ApplicationsGrid({

  applications,

}) {

  return (

    <div

      className="

        grid

        gap-6

      "

    >

      {

        applications.map(

          (

            application

          ) => (

            <ApplicationCard

              key={

                application.id

              }

              application={

                application

              }

            />

          )

        )

      }

    </div>

  );

}

export default ApplicationsGrid;