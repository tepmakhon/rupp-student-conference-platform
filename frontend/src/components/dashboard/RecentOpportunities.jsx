import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getRecentOpportunities } from "../../api/opportunityApi";

function RecentOpportunities() {
  const [opportunities, setOpportunities] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentOpportunities();
  }, []);

  const loadRecentOpportunities = async () => {
    try {
      const data = await getRecentOpportunities();

      setOpportunities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
          bg-white
          p-6
          rounded-2xl
          shadow-md
        "
      >
        Loading opportunities...
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        p-6
        rounded-2xl
        shadow-md
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          text-primary
          mb-6
        "
      >
        Recent Opportunities
      </h2>

      <div className="space-y-4">
        {opportunities.map((opportunity) => (
          <Link
            key={opportunity.id}
            to={`/opportunities/${opportunity.id}`}
            className="
                  flex
                  items-center
                  gap-4
                  border-b
                  pb-4
                  hover:bg-gray-50
                  rounded-lg
                  p-2
                "
          >
            <img
              src={
                opportunity.coverImageUrl ||
                "https://placehold.co/120x80?text=Opportunity"
              }
              alt={opportunity.title}
              className="
                    w-24
                    h-16
                    rounded-lg
                    object-cover
                  "
            />

            <div>
              <h3
                className="
                      font-semibold
                      text-primary
                    "
              >
                {opportunity.title}
              </h3>

              <p
                className="
                      text-sm
                      text-gray-500
                    "
              >
                {opportunity.organization?.organizationName}
              </p>

              <p
                className="
                      text-xs
                      text-secondary
                    "
              >
                {opportunity.type?.typeName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentOpportunities;
