import { useEffect, useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import LoadingState from "../../components/common/LoadingState";

import ErrorState from "../../components/common/ErrorState";

import OpportunityHero from "../../components/opportunities/OpportunityHero";

import OpportunityInfoGrid from "../../components/opportunities/OpportunityInfoGrid";

import OpportunityDescription from "../../components/opportunities/OpportunityDescription";

import OpportunityRequirements from "../../components/opportunities/OpportunityRequirements";

import OpportunityActionButtons from "../../components/opportunities/OpportunityActionButtons";

import Button from "../../components/ui/Button";
import {
  getOpportunityById,
  saveOpportunity,
  unsaveOpportunity,
  applyOpportunity,
} from "../../api/opportunityApi";

function OpportunityDetailPage() {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  const [applying, setApplying] = useState(false);

  const [saved, setSaved] = useState(false);

  const loadOpportunity = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getOpportunityById(id);

      setOpportunity(data);

      setSaved(data?.isSaved || false);
    } catch (error) {
      console.error(error);

      setError("Failed to load opportunity");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadOpportunity();
  }, [loadOpportunity]);

  const handleSave = async () => {
    try {
      setSaving(true);

      if (saved) {
        await unsaveOpportunity(id);

        setSaved(false);

        toast.success("Removed from saved");
      } else {
        await saveOpportunity(id);

        setSaved(true);

        toast.success("Opportunity saved");
      }
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Action failed");
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);

      await applyOpportunity(id, {});

      toast.success("Application submitted");
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Application failed");
    } finally {
      setApplying(false);
    }
  };
  const expired =
    opportunity?.deadline && new Date(opportunity.deadline) < new Date();

  return (
    <DashboardLayout>
      <div
        className="
          max-w-7xl
          mx-auto
          space-y-8
        "
      >
        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && opportunity && (
          <>
            <OpportunityHero opportunity={opportunity} />

            <OpportunityInfoGrid opportunity={opportunity} />

            <OpportunityDescription description={opportunity.description} />

            <OpportunityRequirements requirements={opportunity.requirements} />

            <OpportunityActionButtons
              saved={saved}

              saving={saving}

              applying={applying}

              expired={expired}

              onSave={handleSave}

              onApply={handleApply}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default OpportunityDetailPage;
