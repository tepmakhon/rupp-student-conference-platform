function ApplicationSearch({
  value,

  onChange,
}) {
  return (
    <input
      type="text"

      value={value}

      onChange={(e) => onChange(e.target.value)}

      placeholder="Search applications..."

      className="

        w-full

        border

        rounded-2xl

        p-4

        focus:outline-none

        focus:ring-2

        focus:ring-secondary

      "
    />
  );
}

export default ApplicationSearch;
