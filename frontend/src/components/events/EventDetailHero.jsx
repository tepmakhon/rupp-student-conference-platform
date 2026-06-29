import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

function EventDetailHero({ event }) {
  return (
    <div
      className="

        relative

        rounded-3xl

        overflow-hidden

      "
    >
      <img
        src={event.bannerImageUrl || "https://placehold.co/1200x500?text=Event"}

        alt={event.title}

        className="

          w-full

          h-96

          object-cover

        "
      />

      <div
        className="

          absolute

          inset-0

          bg-black/50

          flex

          items-end

        "
      >
        <div
          className="

            p-10

            text-white

            space-y-5

          "
        >
          <span
            className="

              inline-block

              px-4

              py-2

              rounded-full

              bg-white/20

            "
          >
            {event.category?.categoryName}
          </span>

          <h1
            className="

              text-5xl

              font-bold

            "
          >
            {event.title}
          </h1>

          <div
            className="

              flex

              items-center

              gap-3

            "
          >
            <BuildingOffice2Icon
              className="

                w-6

                h-6

              "
            />

            <span>{event.organization?.organizationName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailHero;
