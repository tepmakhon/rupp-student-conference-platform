import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

import { getRecommendations } from "../../api/recommendationApi";

function RecommendationsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [student, setStudent] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [events, setEvents] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getRecommendations();

      setStudent(data.student);
      setKeywords(data.keywords || []);
      setEvents(data.events || []);
      setOpportunities(data.opportunities || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <PageHeader
          title="Recommended For You"
          description="Personalized recommendations based on your profile and skills."
        />

        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} />}

        {!loading &&
          !error &&
          events.length === 0 &&
          opportunities.length === 0 && (
            <EmptyState
              title="No Recommendations"
              description="Complete your profile and add skills to receive personalized recommendations."
            />
          )}

        {!loading && !error && (
          <>
            {/* Student Profile */}

            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary mb-5">
                Based On Your Profile
              </h2>

              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <strong>University:</strong> {student?.university || "-"}
                </p>

                <p>
                  <strong>Faculty:</strong> {student?.faculty || "-"}
                </p>

                <p>
                  <strong>Major:</strong> {student?.major || "-"}
                </p>

                <p>
                  <strong>Skills:</strong>{" "}
                  {student?.skills?.length ? student.skills.join(", ") : "-"}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-secondary/10
                      text-secondary
                      text-sm
                    "
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Events */}

            <div>
              <h2 className="text-2xl font-bold text-primary mb-5">
                Recommended Events
              </h2>

              {events.length === 0 ? (
                <p className="text-gray-500">No recommended events.</p>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="
                        bg-white
                        rounded-2xl
                        border
                        shadow-sm
                        overflow-hidden
                      "
                    >
                      {event.bannerImageUrl && (
                        <img
                          src={event.bannerImageUrl}
                          alt={event.title}
                          className="
                            w-full
                            h-48
                            object-cover
                          "
                        />
                      )}

                      <div className="p-5">
                        <h3 className="font-bold text-lg">{event.title}</h3>

                        <p className="text-gray-500 mt-2 line-clamp-2">
                          {event.description}
                        </p>

                        <Link
                          to={`/events/${event.id}`}
                          className="
                            inline-block
                            mt-5
                            bg-primary
                            hover:bg-secondary
                            text-white
                            px-4
                            py-2
                            rounded-xl
                          "
                        >
                          View Event
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Opportunities */}

            <div>
              <h2 className="text-2xl font-bold text-primary mb-5">
                Recommended Opportunities
              </h2>

              {opportunities.length === 0 ? (
                <p className="text-gray-500">No recommended opportunities.</p>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {opportunities.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="
                        bg-white
                        rounded-2xl
                        border
                        shadow-sm
                        overflow-hidden
                      "
                    >
                      {opportunity.coverImageUrl && (
                        <img
                          src={opportunity.coverImageUrl}
                          alt={opportunity.title}
                          className="
                            w-full
                            h-48
                            object-cover
                          "
                        />
                      )}

                      <div className="p-5">
                        <h3 className="font-bold text-lg">
                          {opportunity.title}
                        </h3>

                        <p className="text-gray-500 mt-2 line-clamp-2">
                          {opportunity.description}
                        </p>

                        <Link
                          to={`/opportunities/${opportunity.id}`}
                          className="
                            inline-block
                            mt-5
                            bg-primary
                            hover:bg-secondary
                            text-white
                            px-4
                            py-2
                            rounded-xl
                          "
                        >
                          View Opportunity
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default RecommendationsPage;
