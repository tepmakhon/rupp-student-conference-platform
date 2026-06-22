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

import LoadingState

from "../../components/common/LoadingState";

import RegistrationGrid

from "../../components/events/RegistrationGrid";

import RegistrationEmpty

from "../../components/events/RegistrationEmpty";

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

        setLoading(

          true

        );

        const data =

          await getEventRegistrations(

            id

          );

        setRegistrations(

          Array.isArray(

            data

          )

          ? data

          : []

        );

      }

      catch (

        error

      ) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message ||

          "Failed to load registrations"

        );

      }

      finally {

        setLoading(

          false

        );

      }

    };

  return (

    <DashboardLayout>

      <div

        className="

          max-w-7xl

          mx-auto

          space-y-8

        "

      >

        <PageHeader

          title="Event Registrations"

          description="Students who registered for this event"

        />

        {

          loading &&

          <LoadingState />

        }

        {

          !loading &&

          registrations.length === 0 &&

          <RegistrationEmpty />

        }

        {

          !loading &&

          registrations.length > 0 && (

            <RegistrationGrid

              registrations={

                registrations

              }

            />

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default EventRegistrationsPage;