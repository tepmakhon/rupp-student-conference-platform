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
    rounded-2xl
    shadow-lg
    overflow-hidden
  "
>

  {opportunity.coverImageUrl && (

    <img
      src={opportunity.coverImageUrl}
      alt={opportunity.title}
      className="
        w-full
        h-80
        object-cover
      "
    />

  )}

  <div className="p-8">

    <div
      className="
        flex
        justify-between
        items-start
        mb-6
      "
    >

      <div>

        <h1
          className="
            text-4xl
            font-bold
            text-primary
          "
        >
          {opportunity.title}
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          {
            opportunity.organization
              ?.organizationName
          }
        </p>

      </div>

    </div>

    <div
      className="
        grid
        md:grid-cols-2
        gap-4
        mb-8
      "
    >

      <div
        className="
          bg-gray-50
          p-4
          rounded-xl
        "
      >

        <p className="text-gray-500">
          Opportunity Type
        </p>

        <p className="font-semibold">
          {
            opportunity.type
              ?.typeName
          }
        </p>

      </div>

      <div
        className="
          bg-gray-50
          p-4
          rounded-xl
        "
      >

        <p className="text-gray-500">
          Deadline
        </p>

        <p className="font-semibold">

          {
            opportunity.deadline
              ? new Date(
                  opportunity.deadline
                ).toLocaleDateString()
              : "No Deadline"
          }

        </p>

      </div>

    </div>

    <h2
      className="
        text-2xl
        font-bold
        text-primary
        mb-3
      "
    >
      Description
    </h2>

    <p
      className="
        text-gray-700
        leading-relaxed
        mb-8
      "
    >
      {
        opportunity.description
      }
    </p>

    <h2
      className="
        text-2xl
        font-bold
        text-primary
        mb-3
      "
    >
      Requirements
    </h2>

    <p
      className="
        text-gray-700
        whitespace-pre-line
        leading-relaxed
      "
    >
      {
        opportunity.requirements ||
        "No requirements provided."
      }
    </p>

    <div
      className="
        mt-10
        flex
        gap-4
      "
    >

      <button
        className="
          bg-primary
          hover:bg-secondary
          text-white
          px-6
          py-3
          rounded-xl
        "
      >
        Apply Now
      </button>

      <button
        className="
          border
          border-primary
          text-primary
          px-6
          py-3
          rounded-xl
        "
      >
        Save Opportunity
      </button>

    </div>

  </div>

</div>

      )}

    </DashboardLayout>
  );
}

export default OpportunityDetailPage;