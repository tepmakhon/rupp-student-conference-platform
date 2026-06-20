function DashboardStatCard({

  icon: Icon,

  title,

  value,

}) {

  return (

    <div

      className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        hover:shadow-md
        transition
      "

    >

      <div

        className="
          flex
          justify-between
          items-center
        "

      >

        <div>

          <p

            className="
              text-gray-500
              text-sm
            "

          >

            {title}

          </p>

          <h2

            className="
              text-4xl
              font-bold
              text-primary
              mt-3
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
                bg-primary/10
                flex
                items-center
                justify-center
              "

            >

              <Icon

                className="
                  w-8
                  h-8
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