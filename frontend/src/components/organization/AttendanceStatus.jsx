function AttendanceStatus({

  attendance,

}) {

  if (attendance) {

    return (

      <span
        className="
          px-3
          py-1
          rounded-full
          bg-green-100
          text-green-700
          font-semibold
        "
      >

        Checked In

      </span>

    );

  }

  return (

    <span
      className="
        px-3
        py-1
        rounded-full
        bg-red-100
        text-red-700
        font-semibold
      "
    >

      Not Checked In

    </span>

  );

}

export default AttendanceStatus;