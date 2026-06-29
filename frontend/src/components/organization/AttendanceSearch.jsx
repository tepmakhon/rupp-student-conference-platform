function AttendanceSearch({
  value,

  onChange,
}) {
  return (
    <input
      type="text"

      placeholder="Search student..."

      value={value}

      onChange={(e) => onChange(e.target.value)}

      className="
        w-full
        border
        rounded-2xl
        px-5
        py-3
      "
    />
  );
}

export default AttendanceSearch;
