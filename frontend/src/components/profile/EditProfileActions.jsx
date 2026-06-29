function EditProfileActions({
  saving,

  onCancel,
}) {
  return (
    <div
      className="

        flex

        justify-end

        gap-4

      "
    >
      <button
        type="button"

        onClick={onCancel}

        className="

          px-6

          py-3

          rounded-2xl

          border

          font-semibold

        "
      >
        Cancel
      </button>

      <button
        type="submit"

        disabled={saving}

        className="

          px-8

          py-3

          rounded-2xl

          bg-primary

          hover:bg-secondary

          text-white

          font-semibold

          transition

        "
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

export default EditProfileActions;
