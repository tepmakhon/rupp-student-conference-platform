import RegistrationCard from "./RegistrationCard";

function RegistrationGrid({ registrations }) {
  return (
    <div
      className="

        grid

        gap-6

      "
    >
      {registrations.map((registration) => (
        <RegistrationCard
          key={registration.id}

          registration={registration}
        />
      ))}
    </div>
  );
}

export default RegistrationGrid;
