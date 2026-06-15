import DashboardLayout
from "../../components/layouts/DashboardLayout";

function OrganizationDashboardPage() {

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

          Organization Dashboard

        </h1>

        <div
          className="
            grid
            md:grid-cols-3
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

            Total Opportunities

          </div>

          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >

            Total Applicants

          </div>

          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >

            Active Opportunities

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default OrganizationDashboardPage;