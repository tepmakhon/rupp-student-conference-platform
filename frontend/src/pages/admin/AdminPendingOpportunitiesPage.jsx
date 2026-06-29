import { useEffect, useState, useCallback } from "react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import ErrorState from "../../components/common/ErrorState";

import EmptyState from "../../components/common/EmptyState";

import PendingOpportunityCard from "../../components/admin/PendingOpportunityCard";

import { getPendingOpportunities } from "../../api/opportunityApi";

function AdminPendingOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadOpportunities = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getPendingOpportunities();

      setOpportunities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      setError("Failed to load pending opportunities");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

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
          title="Pending Opportunities"

          description="Review and manage opportunity approval requests."
        />

        {loading && <LoadingState message="Loading pending opportunities..." />}

        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && opportunities.length === 0 && (
          <EmptyState
            title="No Pending Opportunities"

            description="Everything has been reviewed."
          />
        )}

        {!loading && !error && opportunities.length > 0 && (
          <div
            className="

                grid

                gap-6

              "
          >
            {opportunities.map((opportunity) => (
              <PendingOpportunityCard
                key={opportunity.id}

                opportunity={opportunity}

                onAction={loadOpportunities}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AdminPendingOpportunitiesPage;
