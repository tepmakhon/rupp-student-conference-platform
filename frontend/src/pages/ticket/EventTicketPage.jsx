import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import DashboardLoading
from "../../components/dashboard/DashboardLoading";

import DashboardError
from "../../components/dashboard/DashboardError";

import TicketCard
from "../../components/ticket/TicketCard";

import {
  getEventTicket,
} from "../../api/ticketApi";

function EventTicketPage() {

  const {
    eventId,
  } = useParams();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const [
    ticket,
    setTicket,
  ] = useState(null);

  useEffect(() => {

    loadTicket();

  }, []);

  const loadTicket =
  async () => {

    try {

      setLoading(true);

      setError(null);

      const data =
        await getEventTicket(
          eventId
        );

      setTicket(data);

    }

    catch (error) {

      console.error(error);

      setError(
        "Failed to load ticket"
      );

    }

    finally {

      setLoading(false);

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

        {
          loading &&
          <DashboardLoading />
        }

        {
          !loading &&
          error &&
          (
            <DashboardError
              message={error}
            />
          )
        }

        {
          !loading &&
          !error &&
          ticket &&
          (
            <TicketCard
              ticket={ticket}
            />
          )
        }

      </div>

    </DashboardLayout>

  );

}

export default EventTicketPage;