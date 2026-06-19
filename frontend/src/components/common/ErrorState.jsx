function ErrorState({

  message =

    "Something went wrong.",

  action,

}) {

  return (

    <div

      className="

        bg-red-50

        border

        border-red-200

        rounded-2xl

        p-8

        text-center

      "

    >

      <h2

        className="

          text-2xl

          font-bold

          text-red-600

          mb-3

        "

      >

        Error

      </h2>

      <p

        className="

          text-gray-600

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

export default ErrorState;