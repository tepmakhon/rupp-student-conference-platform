import DashboardLayout from "../../components/layouts/DashboardLayout";

function DashboardPage() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-primary mb-8">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            Registered Events
          </h2>

          <p className="text-4xl mt-4 font-bold text-secondary">
            12
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            Saved Opportunities
          </h2>

          <p className="text-4xl mt-4 font-bold text-secondary">
            5
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            Activity Score
          </h2>

          <p className="text-4xl mt-4 font-bold text-gold">
            89
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default DashboardPage;