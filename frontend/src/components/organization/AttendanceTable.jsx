import AttendanceRow
from "./AttendanceRow";

function AttendanceTable({

  registrations,

}) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow
        overflow-hidden
      "
    >

      <table
        className="
          w-full
        "
      >

        <thead
          className="
            bg-primary
            text-white
          "
        >

          <tr>

            <th className="p-4 text-left">
              Student
            </th>

            <th className="p-4 text-left">
              University
            </th>

            <th className="p-4 text-left">
              Major
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Check In
            </th>

          </tr>

        </thead>

        <tbody>

          {
            registrations.map(
              registration => (

                <AttendanceRow
                  key={registration.id}
                  registration={registration}
                />

              )
            )
          }

        </tbody>

      </table>

    </div>

  );

}

export default AttendanceTable;