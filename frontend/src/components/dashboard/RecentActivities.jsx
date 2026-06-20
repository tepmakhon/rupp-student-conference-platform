function RecentActivities({

  activities = [],

}) {

  return (

    <div

      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-6
      "

    >

      <h3

        className="
          text-2xl
          font-bold
          text-primary
          mb-6
        "

      >

        Recent Activities

      </h3>

      <div

        className="
          space-y-4
        "

      >

        {

          activities.length === 0

          && (

            <p

              className="
                text-gray-500
              "

            >

              No activities

            </p>

          )

        }

        {

          activities.map(

            activity => (

              <div

                key={activity.id}

                className="
                  border-b
                  pb-4
                "

              >

                <h4

                  className="
                    font-semibold
                  "

                >

                  {activity.reason}

                </h4>

                <p

                  className="
                    text-secondary
                  "

                >

                  +

                  {

                    activity.scoreChange

                  }

                  points

                </p>

              </div>

            )

          )

        }

      </div>

    </div>

  );

}

export default RecentActivities;