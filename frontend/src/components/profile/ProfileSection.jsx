function ProfileSection({
  title,

  children,
}) {
  return (
    <div
      className="

      mt-10

      "
    >
      <h2
        className="

        text-2xl

        font-bold

        text-primary

        mb-6

        "
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

export default ProfileSection;
