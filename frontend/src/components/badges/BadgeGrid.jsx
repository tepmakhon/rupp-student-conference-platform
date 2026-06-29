import BadgeCard from "./BadgeCard";

function BadgeGrid({ badges }) {
  return (
    <div
      className="

        grid

        grid-cols-2

        md:grid-cols-3

        xl:grid-cols-5

        gap-6

      "
    >
      {badges.map((badge) => (
        <BadgeCard
          key={badge.id}

          badge={badge}
        />
      ))}
    </div>
  );
}

export default BadgeGrid;
