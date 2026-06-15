import DashboardLayout
from "../../components/layouts/DashboardLayout";

function AdminDashboardPage() {

  return (

    <DashboardLayout>

      <div>

        <h1
          className="
            text-4xl
            font-bold
            text-primary
            mb-8
          "
        >

          Admin Dashboard

        </h1>

        <div
          className="
            grid
            md:grid-cols-4
            gap-6
          "
        >

          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >

            Users

          </div>

          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >

            Events

          </div>

          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >

            Opportunities

          </div>

          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >

            Pending Requests

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default AdminDashboardPage;