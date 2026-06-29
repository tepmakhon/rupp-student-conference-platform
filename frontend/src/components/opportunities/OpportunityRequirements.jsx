function OpportunityRequirements({ requirements }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-8
        shadow-sm
        border
      "
    >
      <h2
        className="
          text-3xl
          font-bold
          text-primary
          mb-5
        "
      >
        Requirements
      </h2>

      <p
        className="
          text-gray-700
          whitespace-pre-line
        "
      >
        {requirements || "No requirements provided."}
      </p>
    </div>
  );
}

export default OpportunityRequirements;
