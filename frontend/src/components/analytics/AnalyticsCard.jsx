function AnalyticsCard({ title, value, growth, icon: Icon }) {
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
          {growth !== undefined && growth !== null && (
            <p
              className={
                growth >= 0 ? "text-green-600 mt-2" : "text-red-600 mt-2"
              }
            >
              {growth >= 0 ? "▲" : "▼"} {Math.abs(growth)}%
              <span className="text-gray-500 ml-2">vs last month</span>
            </p>
          )}
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
