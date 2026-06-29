import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Html5QrcodeScanner } from "html5-qrcode";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import { scanAttendance } from "../../api/attendanceApi";

function AttendanceScannerPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    let scanned = false;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false,
    );

    scanner.render(
      async (decodedText) => {
        if (scanned) return;

        scanned = true;

        try {
          const qr = JSON.parse(decodedText);

          await scanAttendance(qr.registrationId);

          toast.success("Student checked in successfully!");

          await scanner.clear();

          setTimeout(() => {
            navigate(`/events/${id}/attendance`);
          }, 2000);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Invalid QR Code");

          scanned = false;
        }
      },

      () => {},
    );

    return () => {
      scanner.clear().catch(() => {});
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
          description="Scan the student's event ticket."
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
