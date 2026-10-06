import ErrorState from "../../components/common/ErrorState";
import useApiQuery from "../../hooks/useApiQuery";




import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import EmptyState from "../../components/common/EmptyState";

import OpportunityCard from "../../components/opportunities/OpportunityCard";

import { getSavedOpportunities } from "../../api/opportunityApi";

function SavedOpportunitiesPage() {
  const { data, loading, error, retry: loadSavedOpportunities } = useApiQuery(getSavedOpportunities);
  const opportunities = Array.isArray(data) ? data.map((item) => item.opportunity).filter(Boolean) : [];

  return (
    <DashboardLayout>
      <div
        className="

          max-w-7xl

          mx-auto

        "
      >
        <PageHeader
          title="Saved Opportunities"

          description="Manage opportunities you saved for later."
        />

        {error && <ErrorState message={error} onRetry={loadSavedOpportunities} />}

        {loading && <LoadingState />}

        {!loading && !error && opportunities.length === 0 && (
          <EmptyState
            title="No Saved Opportunities"

            description="You haven't saved any opportunities yet."
          />
        )}

        {!loading && !error && opportunities.length > 0 && (
          <div
            className="

                grid

                grid-cols-1

                md:grid-cols-2

                xl:grid-cols-3

                gap-6

              "
          >
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}

                opportunity={opportunity}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default SavedOpportunitiesPage;
