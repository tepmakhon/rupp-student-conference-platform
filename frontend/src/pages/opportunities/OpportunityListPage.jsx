import { useEffect, useState, useCallback } from "react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import ErrorState from "../../components/common/ErrorState";

import EmptyState from "../../components/common/EmptyState";

import Pagination from "../../components/common/Pagination";

import OpportunityCard from "../../components/opportunities/OpportunityCard";

import OpportunityFilters from "../../components/opportunities/OpportunityFilters";

import { getOpportunities } from "../../api/opportunityApi";

function OpportunityListPage() {
  const [opportunities, setOpportunities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");

  const [typeId, setTypeId] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const loadOpportunities = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getOpportunities(
        page,

        10,

        keyword,

        typeId,
      );

      setOpportunities(data?.opportunities || []);

      setTotalPages(data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error(error);

      setError("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  }, [page, keyword, typeId]);

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
        <div
          className="

            space-y-6

          "
        >
          <PageHeader
            title="Opportunities"

            description="Discover opportunities available across the platform."
          />

          <OpportunityFilters
            keyword={keyword}

            setKeyword={setKeyword}

            typeId={typeId}

            setTypeId={setTypeId}
          />
        </div>

        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && opportunities.length === 0 && (
          <EmptyState
            title="No Opportunities"

            description="No opportunities available."
          />
        )}

        {!loading && !error && opportunities.length > 0 && (
          <>
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

            <Pagination
              page={page}

              totalPages={totalPages}

              setPage={setPage}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default OpportunityListPage;
