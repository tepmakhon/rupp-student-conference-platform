function RegistrationsTable({

  registrations,

}) {

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

              Student

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

              Faculty

            </th>

            <th

              className="

                p-4

                text-left

              "

            >

              Major

            </th>

          </tr>

        </thead>

        <tbody>

          {

            registrations.map(

              (

                registration

              ) => (

                <tr

                  key={

                    registration.id

                  }

                  className="

                    border-t

                  "

                >

                  <td

                    className="

                      p-4

                    "

                  >

                    {

                      registration

                      .student

                      ?.user

                      ?.profile

                      ?.fullName

                      ||

                      "N/A"

                    }

                  </td>

                  <td

                    className="

                      p-4

                    "

                  >

                    {

                      registration

                      .student

                      ?.university

                      ?.universityName

                    }

                  </td>

                  <td

                    className="

                      p-4

                    "

                  >

                    {

                      registration

                      .student

                      ?.faculty

                      ?.facultyName

                    }

                  </td>

                  <td

                    className="

                      p-4

                    "

                  >

                    {

                      registration

                      .student

                      ?.major

                      ?.majorName

                    }

                  </td>

                </tr>

              )

            )

          }

        </tbody>

      </table>

    </div>

  );

}

export default RegistrationsTable;