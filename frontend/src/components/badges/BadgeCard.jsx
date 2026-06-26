function BadgeCard({

  badge,

}) {

  const colors = {

    bronze:
      "bg-orange-100",

    silver:
      "bg-gray-100",

    gold:
      "bg-yellow-100",

    purple:
      "bg-purple-100",

    blue:
      "bg-blue-100",

  };

  return (

    <div

      className={`

        rounded-3xl

        border

        p-6

        text-center

        transition

        hover:shadow-lg

        ${

          badge.unlocked

          ?

          "bg-white"

          :

          "bg-gray-100 opacity-60"

        }

      `}

    >

      <div

        className={`

          w-20

          h-20

          mx-auto

          rounded-full

          flex

          items-center

          justify-center

          text-4xl

          ${

            colors[badge.color]

          }

        `}

      >

        {

          badge.unlocked

          ?

          badge.icon

          :

          "🔒"

        }

      </div>

      <h3

        className="

          mt-5

          text-lg

          font-bold

        "

      >

        {badge.name}

      </h3>

      <p

        className="

          mt-2

          text-sm

          text-gray-500

        "

      >

        {

          badge.unlocked

          ?

          "Unlocked"

          :

          `Need ${badge.requiredScore} Activity Score`

        }

      </p>

    </div>

  );

}

export default BadgeCard;