function ProfileStatCard({
  label,

  value,
}) {
  return (
    <div
      className="

      bg-gray-50

      rounded-2xl

      p-6

      text-center

      "
    >
      <p
        className="

        text-sm

        text-gray-500

        "
      >
        {label}
      </p>

      <h3
        className="

        text-3xl

        font-bold

        text-primary

        mt-2

        "
      >
        {value}
      </h3>
    </div>
  );
}

export default ProfileStatCard;
