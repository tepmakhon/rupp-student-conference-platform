import {
  QRCodeSVG,
} from "qrcode.react";

function TicketQRCode({

  value,

}) {

  return (

    <div
      className="
        flex
        justify-center
        py-6
      "
    >

      <QRCodeSVG

        value={value}

        size={220}

      />

    </div>

  );

}

export default TicketQRCode;