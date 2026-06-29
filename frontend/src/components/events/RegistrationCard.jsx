function RegistrationCard({ registration }) {
  const student = registration.student;

  return (
    <div
      className="

        bg-white

        rounded-2xl

        border

        shadow-sm

        p-6

      "
    >
      <div
        className="

          flex

          flex-col

          md:flex-row

          md:justify-between

          gap-6

        "
      >
        <div>
          <h2
            className="

              text-2xl

              font-bold

              text-primary

            "
          >
            {student.user?.profile?.fullName || student.user?.email}
          </h2>

          <p
            className="

              text-gray-500

              mt-2

            "
          >
            {student.user?.email}
          </p>
        </div>

        <div
          className="

            grid

            md:grid-cols-3

            gap-4

            text-sm

          "
        >
          <div>
            <p
              className="

                font-semibold

              "
            >
              University
            </p>

            <p>
              {student.university?.universityName ||
                student.university?.name ||
                "N/A"}
            </p>
          </div>

          <div>
            <p
              className="

                font-semibold

              "
            >
              Faculty
            </p>

            <p>{student.faculty?.facultyName || "N/A"}</p>
          </div>

          <div>
            <p
              className="

                font-semibold

              "
            >
              Major
            </p>

            <p>{student.major?.majorName || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationCard;
