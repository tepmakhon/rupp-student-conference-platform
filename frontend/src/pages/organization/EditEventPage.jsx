import {

  useEffect,

  useState,

} from "react";

import {

  useNavigate,

  useParams,

} from "react-router-dom";

import toast

from "react-hot-toast";

import DashboardLayout

from "../../components/layouts/DashboardLayout";

import EventForm
from "../../components/events/EventForm";

import {

  getEventById,

  updateEvent,

} from "../../api/eventApi";

import {

  getEventCategories,

} from "../../api/eventCategoryApi";

function EditEventPage() {

  const { id } =

    useParams();

  const navigate =

    useNavigate();

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    categories,

    setCategories,

  ] = useState([]);

  const [

    initialData,

    setInitialData,

  ] = useState(null);

  useEffect(() => {

    loadPage();

  }, []);

  const loadPage =

    async () => {

      try {

        const [

          event,

          categoriesData,

        ] = await Promise.all([

          getEventById(id),

          getEventCategories(),

        ]);

        setCategories(

          categoriesData

        );

        setInitialData({

          title:

            event.title || "",

          description:

            event.description || "",

          location:

            event.location || "",

          categoryId:

            String(

              event.categoryId

            ),

          capacity:

            event.capacity || "",

          eventDate:

            event.eventDate

            ?

            new Date(

              event.eventDate

            )

            .toISOString()

            .slice(

              0,

              16

            )

            : "",

          bannerImageUrl:

            event.bannerImageUrl || "",

        });

      } catch (error) {

        console.error(

          error

        );

        toast.error(

          "Failed to load event"

        );

      } finally {

        setLoading(

          false

        );

      }

    };

  const handleUpdate =

    async (form) => {

      try {

        await updateEvent(

          id,

          form

        );

        toast.success(

          "Event updated"

        );

        navigate(

          "/organization/events"

        );

      } catch (error) {

        console.error(

          error

        );

        toast.error(

          error?.response?.data?.message ||

          "Failed to update event"

        );

      }

    };

  return (

    <DashboardLayout>

      <div
        className="
          max-w-4xl
          mx-auto
        "
      >

        <div
          className="
            mb-8
          "
        >

          <h1
            className="
              text-4xl
              font-bold
              text-primary
            "
          >

            Edit Event

          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            Update your event information.

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

          : (

            <EventForm

              initialData={
                initialData
              }

              categories={
                categories
              }

              onSubmit={
                handleUpdate
              }

              submitText="Save Changes"

            />

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default EditEventPage;