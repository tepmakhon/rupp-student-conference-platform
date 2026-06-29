function ProfileCard({
  title,

  children,
}) {
  return (
    <div
      className="

      bg-white

      rounded-3xl

      shadow-md

      p-8

      "
    >
      {title && (
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
      )}

      {children}
    </div>
  );
}

export default ProfileCard;
