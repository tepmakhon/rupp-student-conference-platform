function AnalyticsCard({
  title,

  value,

  icon: Icon,
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-7
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
            {value}
          </h2>
        </div>

        <div
          className="
            w-16
            h-16
            rounded-2xl
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
      </div>
    </div>
  );
}

export default AnalyticsCard;
