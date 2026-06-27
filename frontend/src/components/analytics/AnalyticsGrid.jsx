import AnalyticsCard from "./AnalyticsCard";

function AnalyticsGrid({

  cards,

}) {

  return (

    <div
      className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
    >

      {

        cards.map(card => (

          <AnalyticsCard

            key={card.title}

            {...card}

          />

        ))

      }

    </div>

  );

}

export default AnalyticsGrid;