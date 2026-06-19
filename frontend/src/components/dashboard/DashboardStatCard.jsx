function DashboardStatCard({

  title,

  value,

  icon: Icon,

}) {

  return (

    <div

      className="

        bg-white

        rounded-2xl

        border

        shadow-sm

        hover:shadow-md

        transition

        p-6

      "

    >

      <div

        className="

          flex

          items-center

          justify-between

        "

      >

        <div>

          <p

            className="

              text-sm

              text-gray-500

            "

          >

            {title}

          </p>

          <h2

            className="

              text-4xl

              font-bold

              text-primary

              mt-2

            "

          >

            {value ?? 0}

          </h2>

        </div>

        {

          Icon && (

            <div

              className="

                w-14

                h-14

                rounded-xl

                bg-gray-100

                flex

                items-center

                justify-center

              "

            >

              <Icon

                className="

                  w-7

                  h-7

                  text-primary

                "

              />

            </div>

          )

        }

      </div>

    </div>

  );

}

export default DashboardStatCard;