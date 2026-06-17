import {

  useEffect,

  useState,

} from "react";

import {

  useParams,

} from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PageHeader
from "../../components/common/PageHeader";

import PageCard
from "../../components/common/PageCard";

import {

  getEventRegistrations,

} from "../../api/eventApi";

function EventRegistrationsPage() {

  const {

    id,

  } = useParams();

  const [

    registrations,

    setRegistrations,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  useEffect(() => {

    loadRegistrations();

  }, []);

  const loadRegistrations =
    async () => {

      try {

        setLoading(true);

        const data =

          await getEventRegistrations(
            id
          );

        setRegistrations(

          Array.isArray(data)

          ? data

          : []

        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(

          error?.response

            ?.data?.message ||

          "Failed to load registrations"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        <PageHeader

          title="Event Registrations"

          description="Students who registered for this event."

        />

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

          : registrations.length === 0

          ? (

            <PageCard>

              <div
                className="
                  text-center
                  py-12
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-primary
                  "
                >

                  No Registrations Yet

                </h2>

                <p
                  className="
                    text-gray-500
                    mt-3
                  "
                >

                  No students have registered.

                </p>

              </div>

            </PageCard>

          )

          : (

            <div
              className="
                grid
                gap-6
              "
            >

              {

                registrations.map(

                  (
                    registration
                  ) => {

                    const student =

                      registration.student;

                    return (

                      <PageCard

                        key={
                          registration.id
                        }

                      >

                        <div
                          className="
                            flex
                            flex-col
                            md:flex-row
                            md:justify-between
                            md:items-center
                            gap-6
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

                                student.user

                                  ?.profile

                                  ?.fullName ||

                                student.user

                                  ?.email

                              }

                            </h2>

                            <p
                              className="
                                text-gray-500
                                mt-2
                              "
                            >

                              {

                                student.user

                                  ?.email

                              }

                            </p>

                          </div>

                          <div
                            className="
                              grid
                              md:grid-cols-3
                              gap-4
                              text-sm
                            "
                          >

                            <div>

                              <p
                                className="
                                  font-semibold
                                "
                              >

                                University

                              </p>

                              <p>

                                {

                                  student.university

                                    ?.name

                                }

                              </p>

                            </div>

                            <div>

                              <p
                                className="
                                  font-semibold
                                "
                              >

                                Faculty

                              </p>

                              <p>

                                {

                                  student.faculty

                                    ?.facultyName

                                }

                              </p>

                            </div>

                            <div>

                              <p
                                className="
                                  font-semibold
                                "
                              >

                                Major

                              </p>

                              <p>

                                {

                                  student.major

                                    ?.majorName

                                }

                              </p>

                            </div>

                          </div>

                        </div>

                      </PageCard>

                    );

                  }

                )

              }

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default EventRegistrationsPage;