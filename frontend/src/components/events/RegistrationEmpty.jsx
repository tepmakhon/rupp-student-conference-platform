import PageCard from "../common/PageCard";

function RegistrationEmpty() {
  return (
    <PageCard>
      <div
        className="

          text-center

          py-12

        "
      >
        <h2
          className="

            text-2xl

            font-bold

            text-primary

          "
        >
          No Registrations Yet
        </h2>

        <p
          className="

            text-gray-500

            mt-3

          "
        >
          No students have registered.
        </p>
      </div>
    </PageCard>
  );
}

export default RegistrationEmpty;
