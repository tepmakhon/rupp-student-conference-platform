import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
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

import AttendanceStatistics
from "../../components/organization/AttendanceStatistics";

import AttendanceTable
from "../../components/organization/AttendanceTable";

import AttendanceSearch
from "../../components/organization/AttendanceSearch";

import {
  getEventRegistrations,
} from "../../api/eventApi";

import {
  getAttendanceStatistics,
  exportAttendanceCSV,
  exportAttendancePDF,
} from "../../api/attendanceApi";

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
    statistics,
    setStatistics,
  ] = useState({

    totalRegistrations: 0,

    checkedIn: 0,

    remaining: 0,

    attendanceRate: 0,

  });

  const [
    keyword,
    setKeyword,
  ] = useState("");

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      try {

        setLoading(true);

        setError("");

        const [

          registrationData,

          statisticsData,

        ] = await Promise.all([

          getEventRegistrations(id),

          getAttendanceStatistics(id),

        ]);

        setRegistrations(

          Array.isArray(
            registrationData
          )

            ? registrationData

            : []

        );

        setStatistics(
          statisticsData
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to load attendance"
        );

        setError(
          "Failed to load attendance"
        );

      }

      finally {

        setLoading(false);

      }

    };

  const filtered =
    registrations.filter(
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
  const handleExportCsv = async () => {

    try {

      const blob =
        await exportAttendanceCSV(id);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `attendance-${id}.csv`;

      link.click();

      window.URL.revokeObjectURL(url);

      toast.success(
        "CSV downloaded"
      );

    }

    catch (error) {

      console.error(error);

      toast.error(
        "Export failed"
      );

    }

  };
  const handleExportPdf =
  async () => {

    try {

      const blob =
        await exportAttendancePDF(id);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `attendance-${id}.pdf`;

      link.click();

      window.URL.revokeObjectURL(url);

      toast.success(
        "PDF downloaded"
      );

    }

    catch (error) {

      console.error(error);

      toast.error(
        "Export failed"
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

        <div
          className="
            flex
            gap-3
            flex-wrap
          "
        >

          <Link
            to={`/events/${id}/scanner`}
            className="
              bg-primary
              hover:bg-secondary
              text-white
              px-5
              py-3
              rounded-xl
              transition
            "
          >
            Scan QR Code
          </Link>

          <button
            onClick={handleExportCsv}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              py-3
              rounded-xl
              transition
            "
          >
            Export CSV
          </button>

          <button
            onClick={handleExportPdf}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-3
              rounded-xl
              transition
            "
          >
            Export PDF
          </button>

        </div>

      </div>

        {
          !loading &&
          !error &&

          <AttendanceStatistics
            statistics={statistics}
          />

        }

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