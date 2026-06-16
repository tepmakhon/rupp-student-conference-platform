import {
  useEffect,
  useState,
} from "react";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getMyApplications,
} from "../../api/applicationApi";

function MyApplicationsPage() {

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadApplications();

  }, []);

  const loadApplications =
    async () => {

      try {

        setLoading(true);

        const data =

          await getMyApplications();

        setApplications(

          data?.applications ||

          data ||

          []

        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to load applications"
        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-primary
            "
          >

            My Applications

          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            Track all your applications.

          </p>

        </div>

        {

          loading

          ? (

            <div
              className="
                text-center
                py-20
              "
            >

              Loading...

            </div>

          )

          : applications.length === 0

          ? (

            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-10
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  text-primary
                "
              >

                No Applications Yet

              </h2>

            </div>

          )

          : (

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

                    <div

                      key={
                        application.id
                      }

                      className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        p-6
                      "

                    >

                      <h2
                        className="
                          text-xl
                          font-bold
                          text-primary
                        "
                      >

                        {

                          application
                          .opportunity
                          ?.title

                        }

                      </h2>

                      <p
                        className="
                          text-gray-500
                          mt-2
                        "
                      >

                        Status:

                        {" "}

                        <span
                          className="
                            font-semibold
                          "
                        >

                          {

                            application
                            .status

                          }

                        </span>

                      </p>

                    </div>

                  )

                )

              }

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default MyApplicationsPage;