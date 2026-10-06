import ErrorState from "../../components/common/ErrorState";
import useApiQuery from "../../hooks/useApiQuery";
import { useCallback } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import ApplicantCard from "../../components/organization/ApplicantCard";

import { getApplicants } from "../../api/applicationApi";



function OpportunityApplicantsPage() {
  const { id } = useParams();

  const loader = useCallback(() => getApplicants(id), [id]);
  const { data, loading, error, retry: loadApplicants } = useApiQuery(loader);
  const applicants = Array.isArray(data) ? data : [];

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
            Opportunity Applicants
          </h1>

          <p
            className="
              text-gray-600
              mt-2
            "
          >
            Review and manage applicants.
          </p>
        </div>

        {error ? <ErrorState message={error} onRetry={loadApplicants} /> : loading ? (
          <div
            className="
                flex
                justify-center
                py-20
              "
          >
            Loading...
          </div>
        ) : applicants.length === 0 ? (
          <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                p-10
                text-center
              "
          >
            <h2
              className="
                  text-2xl
                  font-bold
                  text-primary
                "
            >
              No Applicants Yet
            </h2>

            <p
              className="
                  text-gray-500
                  mt-2
                "
            >
              Nobody has applied yet.
            </p>
          </div>
        ) : (
          <div
            className="
                grid
                gap-6
              "
          >
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}

                applicant={applicant}

                onUpdate={loadApplicants}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default OpportunityApplicantsPage;
