function OpportunityInfoGrid({ opportunity }) {
  return (
    <div
      className="
        grid
        md:grid-cols-3
        gap-6
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          border
        "
      >
        <p
          className="
            text-gray-500
          "
        >
          Organization
        </p>

        <h3
          className="
            font-bold
            text-primary
            mt-2
          "
        >
          {opportunity.organization?.organizationName}
        </h3>
      </div>

      <div
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          border
        "
      >
        <p
          className="
            text-gray-500
          "
        >
          Type
        </p>

        <h3
          className="
            font-bold
            text-primary
            mt-2
          "
        >
          {opportunity.type?.typeName}
        </h3>
      </div>

      <div
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          border
        "
      >
        <p
          className="
            text-gray-500
          "
        >
          Status
        </p>

        <h3
          className="
            font-bold
            text-secondary
            mt-2
          "
        >
          {opportunity.status}
        </h3>
      </div>
    </div>
  );
}

export default OpportunityInfoGrid;
