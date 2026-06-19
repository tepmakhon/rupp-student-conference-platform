import {

  useEffect,

  useState,

  useCallback,

} from "react";

import {

  useParams,

} from "react-router-dom";

import toast
from "react-hot-toast";

import {

  CalendarDaysIcon,

  MapPinIcon,

  BuildingOffice2Icon,

} from "@heroicons/react/24/outline";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import LoadingState
from "../../components/common/LoadingState";

import ErrorState
from "../../components/common/ErrorState";

import Button
from "../../components/ui/Button";

import {

  getEventById,

  registerForEvent,

} from "../../api/eventApi";

import {

  formatDate,

} from "../../utils/formatDate";

function EventDetailPage() {

  const { id } =

    useParams();

  const [

    event,

    setEvent,

  ] = useState(null);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    error,

    setError,

  ] = useState("");

  const [

    registering,

    setRegistering,

  ] = useState(false);

  const loadEvent =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          setError(

            ""

          );

          const data =

            await getEventById(

              id

            );

          setEvent(

            data

          );

        }

        catch (error) {

          console.error(

            error

          );

          setError(

            "Failed to load event"

          );

        }

        finally {

          setLoading(

            false

          );

        }

      },

      [

        id,

      ]

    );

  useEffect(() => {

    loadEvent();

  },

  [

    loadEvent,

  ]);

  const handleRegister =

    async () => {

      try {

        setRegistering(

          true

        );

        await registerForEvent(

          id

        );

        toast.success(

          "Successfully registered"

        );

      }

      catch (error) {

        toast.error(

          error?.response

          ?.data?.message

          ||

          "Registration failed"

        );

      }

      finally {

        setRegistering(

          false

        );

      }

    };

  return (

    <DashboardLayout>

      <div

        className="

          max-w-6xl

          mx-auto

        "

      >

        {

          loading

          &&

          <LoadingState />

        }

        {

          !loading

          &&

          error

          &&

          (

            <ErrorState

              message={

                error

              }

            />

          )

        }

        {

          !loading

          &&

          !error

          &&

          event

          &&

          (

            <div

              className="

                bg-white

                rounded-3xl

                overflow-hidden

                shadow-sm

                border

              "

            >

              <img

                src={

                  event.bannerImageUrl

                  ||

                  "https://placehold.co/1200x500?text=Event"

                }

                alt={

                  event.title

                }

                className="

                  w-full

                  h-80

                  object-cover

                "

              />

              <div

                className="

                  p-8

                "

              >

                <h1

                  className="

                    text-4xl

                    font-bold

                    text-primary

                    mb-8

                  "

                >

                  {event.title}

                </h1>

                <div

                  className="

                    grid

                    md:grid-cols-3

                    gap-6

                    mb-8

                  "

                >

                  <div

                    className="

                      flex

                      items-center

                      gap-3

                    "

                  >

                    <BuildingOffice2Icon

                      className="

                        w-6

                        h-6

                        text-primary

                      "

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

                      gap-3

                    "

                  >

                    <CalendarDaysIcon

                      className="

                        w-6

                        h-6

                        text-primary

                      "

                    />

                    <span>

                      {

                        formatDate(

                          event.eventDate

                        )

                      }

                    </span>

                  </div>

                  <div

                    className="

                      flex

                      items-center

                      gap-3

                    "

                  >

                    <MapPinIcon

                      className="

                        w-6

                        h-6

                        text-primary

                      "

                    />

                    <span>

                      {

                        event.location

                      }

                    </span>

                  </div>

                </div>

                <div

                  className="

                    border-t

                    pt-8

                  "

                >

                  <h2

                    className="

                      text-2xl

                      font-semibold

                      mb-4

                    "

                  >

                    Description

                  </h2>

                  <p

                    className="

                      text-gray-600

                      leading-relaxed

                    "

                  >

                    {

                      event.description

                    }

                  </p>

                </div>

                <div

                  className="

                    mt-10

                  "

                >

                  <Button

                    onClick={

                      handleRegister

                    }

                    disabled={

                      registering

                    }

                  >

                    {

                      registering

                      ?

                      "Registering..."

                      :

                      "Register Event"

                    }

                  </Button>

                </div>

              </div>

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default EventDetailPage;