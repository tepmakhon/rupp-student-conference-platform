import DashboardLayout from "../../components/layouts/DashboardLayout";

function DashboardPage() {

  return (

    <DashboardLayout>

      {/* Welcome Banner */}

      <div
        className="
          bg-gradient-to-r
          from-primary
          to-secondary
          rounded-3xl
          p-8
          text-white
          mb-8
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            mb-2
          "
        >
          Welcome Back 👋
        </h1>

        <p
          className="
            text-lg
            text-green-100
          "
        >
          You have 3 upcoming events and 5 opportunities waiting for you.
        </p>

      </div>

      {/* Statistics */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-10
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >

          <p className="text-gray-500">
            Events Attended
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-3
            "
          >
            12
          </h2>

          <p
            className="
              text-green-600
              mt-2
            "
          >
            ↑ 8%
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >

          <p className="text-gray-500">
            Active Applications
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-3
            "
          >
            5
          </h2>

          <p
            className="
              text-green-600
              mt-2
            "
          >
            ↑ 12%
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >

          <p className="text-gray-500">
            Skills Gained
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-3
            "
          >
            24
          </h2>

          <p
            className="
              text-green-600
              mt-2
            "
          >
            ↑ 15%
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >

          <p className="text-gray-500">
            Activity Score
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-gold
              mt-3
            "
          >
            89
          </h2>

          <p
            className="
              text-green-600
              mt-2
            "
          >
            Excellent
          </p>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default DashboardPage;