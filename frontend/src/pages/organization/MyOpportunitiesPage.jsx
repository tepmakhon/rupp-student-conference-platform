import { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import EmptyState from "../../components/common/EmptyState";

import DeleteConfirmationModal from "../../components/admin/DeleteConfirmationModal";

import {
  PlusCircleIcon,
  UserGroupIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

import { formatDate } from "../../utils/formatDate";

import {
  getMyOpportunities,
  deleteOpportunity,
} from "../../api/opportunityApi";

function MyOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const loadOpportunities = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMyOpportunities();

      setOpportunities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

  const handleDelete = async () => {
    try {
      await deleteOpportunity(selected.id);

      toast.success("Opportunity deleted");

      setDeleteOpen(false);

      loadOpportunities();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Delete failed");
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
        <div
          className="

            flex

            flex-col

            md:flex-row

            md:items-center

            md:justify-between

            gap-6

          "
        >
          <PageHeader
            title="My Opportunities"

            description="Manage all opportunities created by your organization."
          />

          <Link
            to="/opportunities/create"

            className="

              flex

              items-center

              gap-2

              bg-primary

              hover:bg-secondary

              text-white

              px-6

              py-3

              rounded-xl

              transition

              font-medium

              h-fit

            "
          >
            <PlusCircleIcon
              className="

                w-5

                h-5

              "
            />
            Create Opportunity
          </Link>
        </div>

        {loading && <LoadingState />}

        {!loading && opportunities.length === 0 && (
          <EmptyState
            title="No Opportunities Yet"

            description="Create your first opportunity."
          />
        )}

        {!loading && opportunities.length > 0 && (
          <div
            className="

                grid

                gap-6

              "
          >
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}

                className="

                        bg-white

                        border

                        rounded-2xl

                        shadow-sm

                        p-6

                        hover:shadow-lg

                        transition

                      "
              >
                <div
                  className="

                          flex

                          flex-col

                          lg:flex-row

                          lg:justify-between

                          gap-8

                        "
                >
                  <div>
                    <div
                      className="

                              flex

                              items-center

                              gap-3

                            "
                    >
                      <h2
                        className="

                                text-2xl

                                font-bold

                                text-primary

                              "
                      >
                        {opportunity.title}
                      </h2>

                      {opportunity.type && (
                        <span
                          className="

                                    px-3

                                    py-1

                                    bg-secondary/10

                                    text-secondary

                                    rounded-full

                                    text-xs

                                    font-medium

                                  "
                        >
                          {opportunity.type?.typeName}
                        </span>
                      )}
                    </div>

                    <p
                      className="

                              text-gray-600

                              mt-4

                              line-clamp-3

                            "
                    >
                      {opportunity.description}
                    </p>

                    <div
                      className="

                              flex

                              flex-wrap

                              gap-5

                              mt-5

                              text-sm

                              text-gray-500

                            "
                    >
                      <div
                        className="

                                flex

                                items-center

                                gap-2

                              "
                      >
                        <BriefcaseIcon
                          className="

                                  w-5

                                  h-5

                                "
                        />

                        {opportunity.status}
                      </div>

                      {opportunity.deadline && (
                        <div
                          className="

                                    flex

                                    items-center

                                    gap-2

                                  "
                        >
                          <CalendarDaysIcon
                            className="

                                      w-5

                                      h-5

                                    "
                          />

                          {formatDate(opportunity.deadline)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="

                            flex

                            flex-wrap

                            gap-3

                            h-fit

                          "
                  >
                    <Link
                      to={`/organization/opportunities/${opportunity.id}/applicants`}

                      className="

                              flex

                              items-center

                              gap-2

                              bg-primary

                              text-white

                              px-4

                              py-3

                              rounded-xl

                            "
                    >
                      <UserGroupIcon
                        className="

                                w-5

                                h-5

                              "
                      />
                      Applicants
                    </Link>

                    <Link
                      to={`/organization/opportunities/${opportunity.id}/edit`}

                      className="

                              flex

                              items-center

                              gap-2

                              bg-secondary

                              text-white

                              px-4

                              py-3

                              rounded-xl

                            "
                    >
                      <PencilSquareIcon
                        className="

                                w-5

                                h-5

                              "
                      />
                      Edit
                    </Link>

                    <button
                      onClick={() => {
                        setSelected(opportunity);

                        setDeleteOpen(true);
                      }}

                      className="

                              flex

                              items-center

                              gap-2

                              bg-red-600

                              text-white

                              px-4

                              py-3

                              rounded-xl

                            "
                    >
                      <TrashIcon
                        className="

                                w-5

                                h-5

                              "
                      />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <DeleteConfirmationModal
          open={deleteOpen}

          title={selected?.title}

          onClose={() => setDeleteOpen(false)}

          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}

export default MyOpportunitiesPage;
