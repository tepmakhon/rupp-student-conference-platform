import { useEffect, useState , useCallback } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import ErrorState from "../../components/common/ErrorState";

import BadgeStats from "../../components/badges/BadgeStats";

import BadgeGrid from "../../components/badges/BadgeGrid";

import BadgeEmpty from "../../components/badges/BadgeEmpty";

import { getMyBadges } from "../../api/badgeApi";

function StudentBadgesPage() {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [badges, setBadges] = useState([]);

  const [activityScore, setActivityScore] = useState(0);

  const loadBadges = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getMyBadges();

      setBadges(data.badges);

      setActivityScore(data.activityScore);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load badges");

      setError("Failed to load badges");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) loadBadges();
    });
    return () => { active = false; };
  }, [loadBadges]);



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
          title="My Badges"

          description="Achievements earned from your activities."
        />

        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && (
          <>
            <BadgeStats
              activityScore={activityScore}
              badgeCount={badges.length}
              badges={badges}
            />

            {badges.length === 0 ? (
              <BadgeEmpty />
            ) : (
              <BadgeGrid badges={badges} />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentBadgesPage;
