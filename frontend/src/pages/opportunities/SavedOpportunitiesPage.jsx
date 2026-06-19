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

import OpportunityCard
from "../../components/opportunities/OpportunityCard";

import {

  getSavedOpportunities,

} from "../../api/opportunityApi";

function SavedOpportunitiesPage() {

  const [

    opportunities,

    setOpportunities,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const loadSavedOpportunities =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          const data =

            await getSavedOpportunities();

          const normalized =

            Array.isArray(

              data

            )

            ?

            data

            .map(

              (

                item

              ) =>

              item.opportunity

            )

            .filter(

              Boolean

            )

            :

            [];

          setOpportunities(

            normalized

          );

        }

        catch (error) {

          console.error(

            error

          );

          toast.error(

            "Failed to load saved opportunities"

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

    loadSavedOpportunities();

  },

  [

    loadSavedOpportunities,

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

          title="Saved Opportunities"

          description="Manage opportunities you saved for later."

        />

        {

          loading

          &&

          <LoadingState />

        }

        {

          !loading

          &&

          opportunities.length === 0

          &&

          (

            <EmptyState

              title="No Saved Opportunities"

              description="You haven't saved any opportunities yet."

            />

          )

        }

        {

          !loading

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

export default SavedOpportunitiesPage;