import {

  useEffect,

  useState,

  useCallback,

} from "react";

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

import ApplicationCard
from "../../components/student/ApplicationCard";

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

  const loadApplications =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          const data =

            await getMyApplications();

          setApplications(

            data?.applications

            ||

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

          setLoading(

            false

          );

        }

      },

      []

    );

  useEffect(() => {

    loadApplications();

  },

  [

    loadApplications,

  ]);

  return (

    <DashboardLayout>

      <div

        className="

          max-w-7xl

          mx-auto

        "

      >

        <PageHeader

          title="My Applications"

          description="Track all your opportunity applications."

        />

        {

          loading

          &&

          <LoadingState />

        }

        {

          !loading

          &&

          applications.length === 0

          &&

          (

            <EmptyState

              title="No Applications Yet"

              description="Start applying for opportunities."

            />

          )

        }

        {

          !loading

          &&

          applications.length > 0

          &&

          (

            <div

              className="

                space-y-6

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

export default MyApplicationsPage;