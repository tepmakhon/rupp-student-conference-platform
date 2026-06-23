import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PageHeader
from "../../components/common/PageHeader";

import LoadingState
from "../../components/common/LoadingState";

import EmptyState
from "../../components/common/EmptyState";

import ApplicationCard
from "../../components/applications/ApplicationCard";

import {
  getMyApplications,
} from "../../api/applicationApi";

import toast
from "react-hot-toast";

function StudentApplicationsPage() {

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

        data.applications || []

      );

    }

    catch (error) {

      console.error(error);

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

      <div

        className="

          max-w-7xl

          mx-auto

          space-y-8

        "

      >

        <PageHeader

          title="My Applications"

          description="Track all your applications"

        />

        {

          loading &&

          <LoadingState />

        }

        {

          !loading &&

          applications.length === 0 && (

            <EmptyState

              title="No Applications Yet"

              description="You have not applied for any opportunities"

            />

          )

        }

        {

          !loading &&

          applications.length > 0 && (

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

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default StudentApplicationsPage;