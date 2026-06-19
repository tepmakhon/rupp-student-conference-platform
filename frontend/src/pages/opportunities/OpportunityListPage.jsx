import {

  useEffect,

  useState,

  useCallback,

} from "react";

import {

  Link,

} from "react-router-dom";

import {

  useSelector,

} from "react-redux";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PageHeader
from "../../components/common/PageHeader";

import LoadingState
from "../../components/common/LoadingState";

import ErrorState
from "../../components/common/ErrorState";

import EmptyState
from "../../components/common/EmptyState";

import OpportunityCard
from "../../components/opportunities/OpportunityCard";

import {

  getOpportunities,

} from "../../api/opportunityApi";

function OpportunityListPage() {

  const role =

    useSelector(

      (state) =>

        state.auth.role

    );

  const [

    opportunities,

    setOpportunities,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    error,

    setError,

  ] = useState("");

  const loadOpportunities =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          setError(

            ""

          );

          const data =

            await getOpportunities();

          setOpportunities(

            data?.opportunities

            ||

            data

            ||

            []

          );

        }

        catch (error) {

          console.error(

            error

          );

          setError(

            "Failed to load opportunities"

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

    loadOpportunities();

  },

  [

    loadOpportunities,

  ]);

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

            flex

            flex-col

            md:flex-row

            md:items-center

            md:justify-between

            gap-5

          "

        >

          <PageHeader

            title="Opportunities"

            description="Discover opportunities available across the platform."

          />

        </div>

        {

          loading

          &&

          <LoadingState />

        }

        {

          !loading

          &&

          error

          &&

          (

            <ErrorState

              message={

                error

              }

            />

          )

        }

        {

          !loading

          &&

          !error

          &&

          opportunities.length === 0

          &&

          (

            <EmptyState

              title="No Opportunities"

              description="No opportunities available."

            />

          )

        }

        {

          !loading

          &&

          !error

          &&

          opportunities.length > 0

          &&

          (

            <div

              className="

                grid

                grid-cols-1

                md:grid-cols-2

                xl:grid-cols-3

                gap-6

              "

            >

              {

                opportunities.map(

                  (

                    opportunity

                  ) => (

                    <OpportunityCard

                      key={

                        opportunity.id

                      }

                      opportunity={

                        opportunity

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

export default OpportunityListPage;