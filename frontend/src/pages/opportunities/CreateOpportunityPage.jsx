import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import OpportunityForm from "../../components/opportunities/OpportunityForm";

import { createOpportunity } from "../../api/opportunityApi";

import { getOpportunityTypes } from "../../api/opportunityTypeApi";

function CreateOpportunityPage() {
  const navigate = useNavigate();

  const [opportunityTypes, setOpportunityTypes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      setLoading(true);

      const data = await getOpportunityTypes();

      setOpportunityTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load opportunity types");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (form) => {
    try {
      setSaving(true);

      await createOpportunity(form);

      toast.success("Opportunity created");

      navigate("/organization/opportunities");
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingState message="Loading..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="

          max-w-5xl

          mx-auto

        "
      >
        <PageHeader
          title="Create Opportunity"

          description="Publish new opportunities."
        />

        <OpportunityForm
          opportunityTypes={opportunityTypes}

          loading={saving}

          onSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
}

export default CreateOpportunityPage;
