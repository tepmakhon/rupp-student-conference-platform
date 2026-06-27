import {
  useEffect,
} from "react";

import {
  Html5QrcodeScanner,
} from "html5-qrcode";

import toast from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PageHeader
from "../../components/common/PageHeader";

import {
  scanAttendance,
} from "../../api/attendanceApi";

function AttendanceScannerPage() {

  useEffect(() => {

    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

      let scanned = false;

      scanner.render(

        async (decodedText) => {

          if (scanned) return;

          scanned = true;

          try {

            const qr = JSON.parse(decodedText);

            await scanAttendance(
              qr.registrationId
            );

            toast.success(
              "Student checked in!"
            );

            await scanner.clear();

          }

          catch (error) {

            toast.error(
              error.response?.data?.message ||
              "Invalid QR Code"
            );

            scanned = false;

          }

        },

        () => {}

      );

    return () => {

      scanner.clear();

    };

  }, []);

  return (

    <DashboardLayout>

      <div
        className="
          max-w-4xl
          mx-auto
          space-y-8
        "
      >

        <PageHeader
          title="QR Attendance Scanner"
          description="Scan a student's ticket."
        />

        <div
          className="
            bg-white
            rounded-3xl
            shadow
            p-8
          "
        >

          <div id="reader" />

        </div>

      </div>

    </DashboardLayout>

  );

}

export default AttendanceScannerPage;