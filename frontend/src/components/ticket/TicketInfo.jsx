function TicketInfo({

  ticket,

}) {

  return (

    <div
      className="
        space-y-4
      "
    >

      <p>
        <strong>Student:</strong>{" "}
        {ticket.studentName}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {ticket.location}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(ticket.eventDate).toLocaleString()}
      </p>

      <p>
        <strong>Registration:</strong>{" "}
        #{ticket.registrationId}
      </p>

    </div>

  );

}

export default TicketInfo;