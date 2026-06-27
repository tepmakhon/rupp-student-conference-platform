function TicketHeader({

  title,

}) {

  return (

    <div
      className="
        border-b
        pb-6
      "
    >

      <p
        className="
          text-sm
          text-gray-500
        "
      >
        Royal University of Phnom Penh
      </p>

      <h1
        className="
          text-3xl
          font-bold
          text-primary
          mt-2
        "
      >
        {title}
      </h1>

      <p
        className="
          mt-2
          text-gray-500
        "
      >
        Official Event Admission Ticket
      </p>

    </div>

  );

}

export default TicketHeader;