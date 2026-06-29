function OpportunityActionButtons({
  saved,

  saving,

  applying,

  expired,

  onSave,

  onApply,
}) {
  return (
    <div
      className="

        flex

        flex-wrap

        gap-4

      "
    >
      <button
        onClick={onApply}

        disabled={applying || expired}

        className="

          bg-primary

          text-white

          px-6

          py-3

          rounded-xl

        "
      >
        {expired ? "Expired" : applying ? "Applying..." : "Apply Now"}
      </button>

      <button
        onClick={onSave}

        disabled={saving}

        className="

          border

          px-6

          py-3

          rounded-xl

        "
      >
        {saving ? "Saving..." : saved ? "Saved" : "Save Opportunity"}
      </button>
    </div>
  );
}

export default OpportunityActionButtons;
