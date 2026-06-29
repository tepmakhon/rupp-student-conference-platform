function PageCard({ children, className = "" }) {
  return (
    <div
      className={`

        bg-white

        rounded-3xl

        shadow-md

        p-8

        ${className}

      `}
    >
      {children}
    </div>
  );
}

export default PageCard;
