import {

  useEffect,

  useState,

  useCallback,

} from "react";

import {

  Link,

} from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PageHeader
from "../../components/common/PageHeader";

import LoadingState
from "../../components/common/LoadingState";

import EmptyState
from "../../components/common/EmptyState";

import DeleteConfirmationModal
from "../../components/admin/DeleteConfirmationModal";

import {

  CalendarDaysIcon,

  MapPinIcon,

  PencilSquareIcon,

  TrashIcon,

  UserGroupIcon,

} from "@heroicons/react/24/outline";

import {

  formatDate,

} from "../../utils/formatDate";

import {

  getMyEvents,

  deleteEvent,

} from "../../api/eventApi";

function MyEventsPage() {

  const [

    events,

    setEvents,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    selected,

    setSelected,

  ] = useState(null);

  const [

    deleteOpen,

    setDeleteOpen,

  ] = useState(false);

  const loadEvents =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          const data =

            await getMyEvents();

          setEvents(

            Array.isArray(

              data

            )

            ?

            data

            :

            []

          );

        }

        catch (error) {

          console.error(

            error

          );

          toast.error(

            "Failed to load events"

          );

        }

        finally {

          setLoading(

            false

          );

        }

      },

      []

    );

  useEffect(() => {

    loadEvents();

  },

  [

    loadEvents,

  ]);

  const handleDelete =

    async () => {

      try {

        await deleteEvent(

          selected.id

        );

        toast.success(

          "Event deleted"

        );

        setDeleteOpen(

          false

        );

        loadEvents();

      }

      catch (error) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message

          ||

          "Delete failed"

        );

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

        <div

          className="

            flex

            flex-col

            md:flex-row

            md:items-center

            md:justify-between

            gap-6

          "

        >

          <PageHeader

            title="My Events"

            description="Manage all your events."

          />

          <Link

            to="/events/create"

            className="

              bg-primary

              hover:bg-secondary

              text-white

              px-6

              py-3

              rounded-xl

              transition

              font-medium

              h-fit

            "

          >

            Create Event

          </Link>

        </div>

        {

          loading

          &&

          <LoadingState />

        }

        {

          !loading

          &&

          events.length === 0

          &&

          (

            <EmptyState

              title="No Events Yet"

              description="Create your first event."

            />

          )

        }

        {

          !loading

          &&

          events.length > 0

          &&

          (

            <div

              className="

                grid

                gap-6

              "

            >

              {

                events.map(

                  (

                    event

                  ) => (

                    <div

                      key={

                        event.id

                      }

                      className="

                        bg-white

                        rounded-2xl

                        border

                        shadow-sm

                        p-6

                        hover:shadow-lg

                        transition

                      "

                    >

                      <div

                        className="

                          flex

                          flex-col

                          lg:flex-row

                          lg:justify-between

                          gap-8

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

                              event.title

                            }

                          </h2>

                          <div

                            className="

                              flex

                              flex-wrap

                              gap-5

                              mt-5

                              text-gray-500

                              text-sm

                            "

                          >

                            <div

                              className="

                                flex

                                items-center

                                gap-2

                              "

                            >

                              <MapPinIcon

                                className="

                                  w-5

                                  h-5

                                "

                              />

                              {

                                event.location

                              }

                            </div>

                            <div

                              className="

                                flex

                                items-center

                                gap-2

                              "

                            >

                              <CalendarDaysIcon

                                className="

                                  w-5

                                  h-5

                                "

                              />

                              {

                                formatDate(

                                  event.eventDate

                                )

                              }

                            </div>

                          </div>

                          <span

                            className="

                              inline-block

                              mt-5

                              px-3

                              py-1

                              rounded-full

                              bg-gray-100

                              text-gray-700

                              text-sm

                            "

                          >

                            {

                              event.status

                            }

                          </span>

                        </div>

                        <div

                          className="

                            flex

                            flex-wrap

                            gap-3

                            h-fit

                          "

                        >

                          <Link

                            to={`/organization/events/${event.id}/registrations`}

                            className="

                              flex

                              items-center

                              gap-2

                              bg-primary

                              text-white

                              px-4

                              py-3

                              rounded-xl

                            "

                          >

                            <UserGroupIcon

                              className="

                                w-5

                                h-5

                              "

                            />

                            Registrations

                          </Link>

                          <Link

                            to={`/organization/events/${event.id}/edit`}

                            className="

                              flex

                              items-center

                              gap-2

                              bg-secondary

                              text-white

                              px-4

                              py-3

                              rounded-xl

                            "

                          >

                            <PencilSquareIcon

                              className="

                                w-5

                                h-5

                              "

                            />

                            Edit

                          </Link>

                          <button

                            onClick={() => {

                              setSelected(

                                event

                              );

                              setDeleteOpen(

                                true

                              );

                            }}

                            className="

                              flex

                              items-center

                              gap-2

                              bg-red-600

                              text-white

                              px-4

                              py-3

                              rounded-xl

                            "

                          >

                            <TrashIcon

                              className="

                                w-5

                                h-5

                              "

                            />

                            Delete

                          </button>

                        </div>

                      </div>

                    </div>

                  )

                )

              }

            </div>

          )

        }

        <DeleteConfirmationModal

          open={

            deleteOpen

          }

          title={

            selected?.title

          }

          onClose={() =>

            setDeleteOpen(

              false

            )

          }

          onConfirm={

            handleDelete

          }

        />

      </div>

    </DashboardLayout>

  );

}

export default MyEventsPage;