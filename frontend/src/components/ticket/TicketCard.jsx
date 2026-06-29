import TicketHeader from "./TicketHeader";
import TicketInfo from "./TicketInfo";
import TicketQRCode from "./TicketQRCode";

function TicketCard({ ticket }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
        max-w-3xl
        mx-auto
      "
    >
      <TicketHeader title={ticket.eventTitle} />

      <div
        className="
          grid
          md:grid-cols-2
          gap-10
          mt-8
          items-center
        "
      >
        <TicketInfo ticket={ticket} />

        <TicketQRCode value={ticket.qrCode} />
      </div>
    </div>
  );
}

export default TicketCard;
