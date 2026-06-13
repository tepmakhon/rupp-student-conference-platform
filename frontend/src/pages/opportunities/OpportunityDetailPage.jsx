import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getOpportunityById,
} from "../../api/opportunityApi";

function OpportunityDetailPage() {

  const { id } = useParams();

  const [
    opportunity,
    setOpportunity,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadOpportunity();

  }, [id]);

  const loadOpportunity =
    async () => {

      try {

        const data =
          await getOpportunityById(id);

        setOpportunity(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  return (
    <DashboardLayout>

      {loading ? (

        <p>Loading...</p>

      ) : (
        
        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow-md
          "
        >
          <img
            src={opportunity.imageUrl}
            alt={opportunity.title}
            className="
              w-full
              h-48
              object-cover
              rounded-t-xl
            "
          />

          <h1
            className="
              text-3xl
              font-bold
              mb-4
            "
          >
            {opportunity.title}
          </h1>

          <p
            className="
              text-gray-700
              mb-6
            "
          >
            {opportunity.description}
          </p>

          <div className="space-y-3">

            <p>
              <strong>
                Type:
              </strong>{" "}
              {
                opportunity.type
                  ?.typeName
              }
            </p>

            <p>
              <strong>
                Organization:
              </strong>{" "}
              {
                opportunity.organization
                  ?.organizationName
              }
            </p>

            <p>
              <strong>
                Location:
              </strong>{" "}
              {
                opportunity.location
              }
            </p>

            <p>
              <strong>
                Deadline:
              </strong>{" "}
              {
                new Date(
                  opportunity.deadline
                ).toLocaleDateString()
              }
            </p>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default OpportunityDetailPage;