import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { ArrowPathIcon, ClockIcon } from "@heroicons/react/24/outline";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import { getMyActivityHistory } from "../../api/activityApi";

function ActivityHistoryPage() {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const data = await getMyActivityHistory();

      setHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load activity history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div
        className="

          max-w-7xl

          mx-auto

        "
      >
        {/* Header */}

        <div
          className="

            flex

            flex-col

            md:flex-row

            md:justify-between

            md:items-center

            gap-4

            mb-8

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
              Activity History
            </h1>

            <p
              className="

                text-gray-500

                mt-2

              "
            >
              Track all your earned activity points.
            </p>
          </div>

          <button
            onClick={loadHistory}

            disabled={loading}

            className="

              flex

              items-center

              gap-2

              bg-primary

              hover:bg-secondary

              text-white

              px-5

              py-3

              rounded-xl

              transition

              disabled:opacity-50

            "
          >
            <ArrowPathIcon
              className="

                w-5

                h-5

              "
            />
            Refresh
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <div
            className="

                bg-white

                rounded-2xl

                shadow-md

                p-12

                text-center

              "
          >
            Loading activity history...
          </div>
        )}

        {/* Empty */}

        {!loading && history.length === 0 && (
          <div
            className="

                bg-white

                rounded-2xl

                shadow-md

                p-12

                text-center

              "
          >
            <ClockIcon
              className="

                  w-16

                  h-16

                  text-gray-300

                  mx-auto

                  mb-4

                "
            />

            <h2
              className="

                  text-2xl

                  font-bold

                  text-primary

                "
            >
              No Activity Yet
            </h2>

            <p
              className="

                  text-gray-500

                  mt-3

                "
            >
              Participate in events and opportunities to earn points.
            </p>
          </div>
        )}

        {/* Timeline */}

        {!loading && history.length > 0 && (
          <div
            className="

                space-y-5

              "
          >
            {history.map((item) => (
              <div
                key={item.id}

                className="

                        bg-white

                        rounded-2xl

                        shadow-md

                        p-6

                      "
              >
                <div
                  className="

                          flex

                          flex-col

                          md:flex-row

                          md:justify-between

                          md:items-center

                          gap-4

                        "
                >
                  <div>
                    <h2
                      className="

                              text-xl

                              font-semibold

                              text-primary

                            "
                    >
                      {item.reason}
                    </h2>

                    <p
                      className="

                              text-sm

                              text-gray-500

                              mt-2

                            "
                    >
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <span
                      className="

                              bg-green-100

                              text-green-700

                              font-semibold

                              px-4

                              py-2

                              rounded-full

                            "
                    >
                      +{item.scoreChange}
                      pts
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ActivityHistoryPage;
