function EventDescription({ description }) {
  return (
    <div
      className="

        bg-white

        rounded-3xl

        border

        p-8

        shadow-sm

      "
    >
      <h2
        className="

          text-3xl

          font-bold

          text-primary

          mb-6

        "
      >
        Description
      </h2>

      <p
        className="

          text-gray-600

          leading-8

        "
      >
        {description}
      </p>
    </div>
  );
}

export default EventDescription;
