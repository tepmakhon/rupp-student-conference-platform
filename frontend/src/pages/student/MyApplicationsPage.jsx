import { useCallback, useState } from "react";
import Pagination from "../../components/common/Pagination";
import ErrorState from "../../components/common/ErrorState";
import useApiQuery from "../../hooks/useApiQuery";


import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import EmptyState from "../../components/common/EmptyState";

import ApplicationCard from "../../components/applications/ApplicationCard";

import { getMyApplications } from "../../api/applicationApi";



function StudentApplicationsPage() {
  const [page, setPage] = useState(1);
  const loader = useCallback(() => getMyApplications(page, 10), [page]);
  const { data, loading, error, retry: loadApplications } = useApiQuery(loader);
  const applications = data?.applications || [];

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

        {error && <ErrorState message={error} onRetry={loadApplications} />}

        {loading && <LoadingState />}

        {!loading && !error && applications.length === 0 && (
          <EmptyState
            title="No Applications Yet"

            description="You have not applied for any opportunities"
          />
        )}

        {!loading && !error && applications.length > 0 && (
          <div
            className="

                grid

                gap-6

              "
          >
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}

                application={application}
              />
            ))}
          </div>
        )}
        {!loading && !error && <Pagination page={page} totalPages={data?.pagination?.totalPages || 0} onPageChange={setPage} />}
      </div>
    </DashboardLayout>
  );
}

export default StudentApplicationsPage;
