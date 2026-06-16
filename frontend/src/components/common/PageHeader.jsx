function PageHeader({

  title,

  description,

  action,

}) {

  return (

    <div

      className="

        flex

        flex-col

        md:flex-row

        md:justify-between

        md:items-center

        gap-4

        mb-10

      "

    >

      <div>

        <h1

          className="

            text-4xl

            font-bold

            text-primary

          "

        >

          {title}

        </h1>

        <p

          className="

            text-gray-500

            mt-2

          "

        >

          {description}

        </p>

      </div>

      {action}

    </div>

  );

}

export default PageHeader;