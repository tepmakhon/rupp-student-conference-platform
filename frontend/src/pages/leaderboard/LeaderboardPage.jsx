import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import DashboardHeader from "../../components/dashboard/DashboardHeader";

import DashboardLoading from "../../components/dashboard/DashboardLoading";

import DashboardError from "../../components/dashboard/DashboardError";

import LeaderboardHero from "../../components/leaderboard/LeaderboardHero";

import LeaderboardFilters from "../../components/leaderboard/LeaderboardFilters";

import LeaderboardTable from "../../components/leaderboard/LeaderboardTable";

import LeaderboardPagination from "../../components/leaderboard/LeaderboardPagination";

import { getLeaderboard } from "../../api/leaderboardApi";

import {
  setLeaderboardLoading,
  setLeaderboardData,
  setLeaderboardError,
} from "../../redux/slices/leaderboardSlice";

function LeaderboardPage() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const {
    students,

    pagination,

    loading,

    error,
  } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    loadLeaderboard();
  }, [page]);

  const loadLeaderboard = async () => {
    try {
      dispatch(setLeaderboardLoading(true));

      dispatch(setLeaderboardError(null));

      const data = await getLeaderboard(
        page,

        10,
      );

      dispatch(setLeaderboardData(data));
    } catch (error) {
      console.error(error);

      dispatch(setLeaderboardError("Failed to load leaderboard"));
    } finally {
      dispatch(setLeaderboardLoading(false));
    }
  };

  const filteredStudents = students.filter((student) =>
    student.fullName

      .toLowerCase()

      .includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div
        className="

          max-w-7xl

          mx-auto

          space-y-8

        "
      >
        <DashboardHeader
          title="Leaderboard"

          subtitle="Top active students across the platform"

          loading={loading}

          onRefresh={loadLeaderboard}
        />

        {loading && <DashboardLoading />}

        {!loading && error && <DashboardError message={error} />}

        {!loading && !error && (
          <>
            <LeaderboardHero students={filteredStudents} />

            <LeaderboardFilters
              search={search}

              setSearch={setSearch}
            />

            <LeaderboardTable students={filteredStudents} />

            <LeaderboardPagination
              page={pagination?.page || 1}

              totalPages={pagination?.totalPages || 1}

              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default LeaderboardPage;
