function EmptyState({

  title = "No Data",

  message = "Nothing available yet.",

  action,

}) {

  return (

    <div

      className="

        bg-white

        rounded-2xl

        shadow-md

        p-10

        text-center

      "

    >

      <h2

        className="

          text-2xl

          font-bold

          text-primary

          mb-3

        "

      >

        {title}

      </h2>

      <p

        className="

          text-gray-500

          mb-6

        "

      >

        {message}

      </p>

      {

        action

      }

    </div>

  );

}

export default EmptyState;