function AuthHeader({

  title,

  subtitle,

}) {

  return (

    <div

      className="

        text-center

        mb-10

      "

    >

      <h1

        className="

          text-4xl

          font-bold

          text-primary

        "

      >

        RUPP Platform

      </h1>

      <h2

        className="

          text-2xl

          font-semibold

          mt-6

        "

      >

        {title}

      </h2>

      <p

        className="

          text-gray-500

          mt-2

        "

      >

        {subtitle}

      </p>

    </div>

  );

}

export default AuthHeader;