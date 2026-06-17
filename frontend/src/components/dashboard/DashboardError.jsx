function DashboardError({

  message,

}) {

  return (

    <div

      className="

        bg-red-50

        border

        border-red-200

        text-red-600

        rounded-2xl

        p-6

      "

    >

      {message}

    </div>

  );

}

export default DashboardError;