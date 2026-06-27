import { Response } from "express";

import { createObjectCsvStringifier }
from "csv-writer";

import {
  getAttendanceExportData,
} from "./attendance.service.js";

export const exportCSV = async (
  eventId: bigint,
  res: Response
) => {

  const registrations =
    await getAttendanceExportData(
      eventId
    );

  const csv =
    createObjectCsvStringifier({

      header: [

        {
          id: "name",
          title: "Student Name",
        },

        {
          id: "email",
          title: "Email",
        },

        {
          id: "university",
          title: "University",
        },

        {
          id: "faculty",
          title: "Faculty",
        },

        {
          id: "major",
          title: "Major",
        },

        {
          id: "checkedIn",
          title: "Checked In",
        },

        {
          id: "checkInTime",
          title: "Check In Time",
        },

      ],

    });

  const records =
    registrations.map(
      registration => ({

        name:
          registration.student.user.profile
            ?.fullName || "",

        email:
          registration.student.user.email,

        university:
          registration.student.university
            ?.universityName || "",

        faculty:
          registration.student.faculty
            ?.facultyName || "",

        major:
          registration.student.major
            ?.majorName || "",

        checkedIn:
          registration.attendanceRecord
            ? "Yes"
            : "No",

        checkInTime:
        registration.attendanceRecord?.checkInTime
            ? registration.attendanceRecord.checkInTime.toLocaleString()
            : "-",

      })
    );

  const output =

    csv.getHeaderString() +

    csv.stringifyRecords(records);

  res.setHeader(
    "Content-Type",
    "text/csv"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=attendance-${eventId}.csv`
  );

  res.send(output);

};