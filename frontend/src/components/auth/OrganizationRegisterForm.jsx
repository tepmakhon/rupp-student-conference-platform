function OrganizationRegisterForm({
  form,

  setForm,
}) {
  return (
    <div className="space-y-5">
      <div>
        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Organization Name
        </label>

        <input
          type="text"

          value={form.organizationName}

          onChange={(e) =>
            setForm({
              ...form,

              organizationName: e.target.value,
            })
          }

          placeholder="Enter organization"

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
      </div>

      <div>
        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Description
        </label>

        <textarea
          rows={4}

          value={form.description}

          onChange={(e) =>
            setForm({
              ...form,

              description: e.target.value,
            })
          }

          placeholder="Describe organization"

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
      </div>
    </div>
  );
}

export default OrganizationRegisterForm;
