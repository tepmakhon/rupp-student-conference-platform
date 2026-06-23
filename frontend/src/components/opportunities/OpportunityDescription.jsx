function OpportunityDescription({

  description,

}) {

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

        Description

      </h2>

      <p
        className="
          text-gray-700
          whitespace-pre-line
        "
      >

        {
          description
        }

      </p>

    </div>

  );

}

export default OpportunityDescription;