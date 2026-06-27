import {
  useEffect,
  useState,
} from "react";

import {
  useParams,Link
} from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PageHeader
from "../../components/common/PageHeader";

import LoadingState
from "../../components/common/LoadingState";

import ErrorState
from "../../components/common/ErrorState";

import AttendanceTable
from "../../components/organization/AttendanceTable";

import AttendanceSearch
from "../../components/organization/AttendanceSearch";

import {
  getEventRegistrations,
} from "../../api/eventApi";

function EventAttendancePage() {

  const { id } =
    useParams();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    registrations,
    setRegistrations,
  ] = useState([]);

  const [
    keyword,
    setKeyword,
  ] = useState("");

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      setLoading(true);

      const data =
        await getEventRegistrations(id);

      setRegistrations(data);

    }

    catch (error) {

      console.error(error);

      toast.error(
        "Failed to load attendees"
      );

      setError(
        "Failed to load attendees"
      );

    }

    finally {

      setLoading(false);

    }

  };

  const filtered = registrations.filter(
    item => {

      const name =
        item.student.user.profile
        ?.fullName || "";

      return name
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        );

    }
  );

  return (

    <DashboardLayout>

      <div
        className="
          max-w-7xl
          mx-auto
          space-y-8
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            flex-wrap
            gap-4
          "
        >

          <PageHeader
            title="Attendance"
            description="Manage event attendance."
          />

          <Link
            to={`/events/${id}/scanner`}
            className="
              bg-primary
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-secondary
              transition
            "
          >
            Scan QR Code
          </Link>

        </div>

        <AttendanceSearch
          value={keyword}
          onChange={setKeyword}
        />

        {
          loading &&
          <LoadingState />
        }

        {
          !loading &&
          error &&
          <ErrorState
            message={error}
          />
        }

        {
          !loading &&
          !error &&
          <AttendanceTable
            registrations={filtered}
          />
        }

      </div>

    </DashboardLayout>

  );

}

export default EventAttendancePage;