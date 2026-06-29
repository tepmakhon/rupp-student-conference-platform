import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import ErrorState from "../../components/common/ErrorState";

import OpportunityForm from "../../components/opportunities/OpportunityForm";

import {
  getOpportunityById,
  updateOpportunity,
} from "../../api/opportunityApi";

import { getOpportunityTypes } from "../../api/opportunityTypeApi";

function EditOpportunityPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);

  const [opportunityTypes, setOpportunityTypes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      setError("");

      const [opportunityData, typeData] = await Promise.all([
        getOpportunityById(id),

        getOpportunityTypes(),
      ]);

      setOpportunity(opportunityData);

      setOpportunityTypes(Array.isArray(typeData) ? typeData : []);
    } catch (error) {
      console.error(error);

      setError("Failed to load opportunity");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (form) => {
    try {
      setSaving(true);

      await updateOpportunity(
        id,

        form,
      );

      toast.success("Opportunity updated");

      navigate("/organization/opportunities");
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingState message="Loading opportunity..." />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorState
          message={error}

          action={
            <button
              onClick={loadData}

              className="

                bg-primary

                hover:bg-secondary

                text-white

                px-6

                py-3

                rounded-xl

                transition

              "
            >
              Retry
            </button>
          }
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Edit Opportunity"

        description="Update your opportunity."
      />

      <OpportunityForm
        initialData={opportunity}

        opportunityTypes={opportunityTypes}

        loading={saving}

        onSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}

export default EditOpportunityPage;
