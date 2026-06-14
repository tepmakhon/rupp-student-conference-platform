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
  saveOpportunity,
  unsaveOpportunity,
  applyOpportunity,
} from "../../api/opportunityApi";

import toast
from "react-hot-toast";

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

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    applying,
    setApplying,
  ] = useState(false);

  const [
    saved,
    setSaved,
  ] = useState(false);

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

        toast.error(
          "Failed to load opportunity"
        );

      } finally {

        setLoading(false);

      }
    };

  const handleSave =
    async () => {

      try {

        setSaving(true);

        if (saved) {

          await unsaveOpportunity(id);

          setSaved(false);

          toast.success(
            "Removed from saved opportunities"
          );

        } else {

          await saveOpportunity(id);

          setSaved(true);

          toast.success(
            "Opportunity saved successfully"
          );

        }

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to save opportunity"
        );

      } finally {

        setSaving(false);

      }
    };

  const handleApply =
    async () => {

      try {

        setApplying(true);

        await applyOpportunity(
          id,
          {}
        );

        toast.success(
          "Application submitted successfully"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to apply"
        );

      } finally {

        setApplying(false);

      }
    };

  if (loading) {

    return (

      <DashboardLayout>

        <div
          className="
            text-center
            py-20
            text-lg
          "
        >
          Loading Opportunity...
        </div>

      </DashboardLayout>

    );
  }

  return (

    <DashboardLayout>

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
            src={
              opportunity.coverImageUrl
            }
            alt={
              opportunity.title
            }
            className="
              w-full
              h-96
              object-cover
            "
          />

        )}

        <div className="p-8">

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:justify-between
              md:items-start
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
              md:grid-cols-3
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

            <div
              className="
                bg-gray-50
                p-4
                rounded-xl
              "
            >

              <p className="text-gray-500">
                Status
              </p>

              <p
                className="
                  font-semibold
                  text-secondary
                "
              >
                {opportunity.status}
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
              flex-wrap
              gap-4
            "
          >

            <button
              onClick={handleApply}
              disabled={applying}
              className="
                bg-primary
                hover:bg-secondary
                text-white
                px-6
                py-3
                rounded-xl
                transition
                disabled:opacity-50
              "
            >
              {
                applying
                  ? "Applying..."
                  : "Apply Now"
              }
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className={`
                px-6
                py-3
                rounded-xl
                border
                transition

                ${
                  saved
                    ? "bg-gold text-white border-gold"
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }
              `}
            >
              {
                saving
                  ? "Saving..."
                  : saved
                    ? "Saved"
                    : "Save Opportunity"
              }
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default OpportunityDetailPage;