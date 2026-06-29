import { User, GraduationCap, School, Calendar } from "lucide-react";

function ApplicantsTable({ applicants = [] }) {
  return (
    <div
      className="

        overflow-x-auto

        bg-white

        rounded-2xl

        shadow-md

      "
    >
      <table
        className="

          w-full

        "
      >
        <thead>
          <tr
            className="

              bg-gray-100

            "
          >
            <th
              className="

                p-4

                text-left

              "
            >
              Applicant
            </th>

            <th
              className="

                p-4

                text-left

              "
            >
              University
            </th>

            <th
              className="

                p-4

                text-left

              "
            >
              Major
            </th>

            <th
              className="

                p-4

                text-left

              "
            >
              Applied Date
            </th>
          </tr>
        </thead>

        <tbody>
          {applicants.length === 0 ? (
            <tr>
              <td
                colSpan={4}

                className="

                    p-10

                    text-center

                    text-gray-500

                  "
              >
                No applicants found
              </td>
            </tr>
          ) : (
            applicants.map((application) => (
              <tr
                key={application.id}

                className="

                      border-t

                    "
              >
                <td
                  className="

                        p-4

                      "
                >
                  <div
                    className="

                          flex

                          items-center

                          gap-2

                        "
                  >
                    <User size={18} />

                    <span>
                      {application.student?.user?.profile?.fullName || "N/A"}
                    </span>
                  </div>
                </td>

                <td
                  className="

                        p-4

                      "
                >
                  <div
                    className="

                          flex

                          items-center

                          gap-2

                        "
                  >
                    <School size={18} />

                    <span>
                      {application.student?.university?.universityName || "N/A"}
                    </span>
                  </div>
                </td>

                <td
                  className="

                        p-4

                      "
                >
                  <div
                    className="

                          flex

                          items-center

                          gap-2

                        "
                  >
                    <GraduationCap size={18} />

                    <span>
                      {application.student?.major?.majorName || "N/A"}
                    </span>
                  </div>
                </td>

                <td
                  className="

                        p-4

                      "
                >
                  <div
                    className="

                          flex

                          items-center

                          gap-2

                        "
                  >
                    <Calendar size={18} />

                    <span>
                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicantsTable;
