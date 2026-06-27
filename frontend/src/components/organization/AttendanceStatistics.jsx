function AttendanceStatistics({

  statistics,

}) {

  const cards = [

    {

      title:
        "Registered",

      value:
        statistics.totalRegistrations,

      color:
        "text-blue-600",

    },

    {

      title:
        "Checked In",

      value:
        statistics.checkedIn,

      color:
        "text-green-600",

    },

    {

      title:
        "Remaining",

      value:
        statistics.remaining,

      color:
        "text-red-600",

    },

    {

      title:
        "Attendance",

      value:
        `${statistics.attendanceRate}%`,

      color:
        "text-primary",

    },

  ];

  return (

    <div

      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      "

    >

      {

        cards.map(

          card => (

            <div

              key={card.title}

              className="
                bg-white
                rounded-3xl
                shadow
                p-6
              "

            >

              <p

                className="
                  text-gray-500
                  text-sm
                "

              >

                {card.title}

              </p>

              <h2

                className={`
                  text-4xl
                  font-bold
                  mt-3
                  ${card.color}
                `}

              >

                {card.value}

              </h2>

            </div>

          )

        )

      }

    </div>

  );

}

export default AttendanceStatistics;