import AttendanceStatus
from "./AttendanceStatus";

function AttendanceRow({

  registration,

}) {

  const student =
    registration.student;

  return (

    <tr>

      <td className="p-4">

        {
          student.user.profile
          ?.fullName
        }

      </td>

      <td className="p-4">

        {
          student.university
          ?.universityName
        }

      </td>

      <td className="p-4">

        {
          student.major
          ?.majorName
        }

      </td>

      <td className="p-4">

        <AttendanceStatus
          attendance={
            registration.attendanceRecord
          }
        />

      </td>

      <td className="p-4">

        {
          registration.attendanceRecord

          ?

          new Date(
            registration.attendanceRecord
            .checkInTime
          ).toLocaleString()

          :

          "-"
        }

      </td>

    </tr>

  );

}

export default AttendanceRow;