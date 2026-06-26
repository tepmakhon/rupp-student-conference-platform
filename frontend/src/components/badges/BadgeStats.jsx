function BadgeStats({

  activityScore,

  badgeCount,

  badges = [],

}) {

  const nextBadge =
    badges.find(
      badge => !badge.unlocked
    );

  const progress =
    nextBadge
      ? Math.min(
          (activityScore /
            nextBadge.requiredScore) *
            100,
          100
        )
      : 100;

  return (

    <div
      className="
        bg-primary
        rounded-3xl
        p-8
        text-white
        space-y-8
      "
    >

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:justify-between
          gap-8
        "
      >

        <div>

          <p className="text-white/80">

            Activity Score

          </p>

          <h2 className="text-5xl font-bold">

            {activityScore}

          </h2>

        </div>

        <div>

          <p className="text-white/80">

            Badges Earned

          </p>

          <h2 className="text-5xl font-bold">

            {badgeCount}

          </h2>

        </div>

      </div>

      {

        nextBadge && (

          <div>

            <div
              className="
                flex
                justify-between
                mb-3
              "
            >

              <div>

                <p className="font-semibold">

                  Next Badge

                </p>

                <p className="text-white/80">

                  {nextBadge.badgeName}

                </p>

              </div>

              <div className="text-right">

                <p>

                  {activityScore} / {nextBadge.requiredScore}

                </p>

              </div>

            </div>

            <div
              className="
                w-full
                h-4
                rounded-full
                bg-white/20
                overflow-hidden
              "
            >

              <div

                style={{
                  width: `${progress}%`,
                }}

                className="
                  h-full
                  bg-yellow-400
                  transition-all
                  duration-500
                "

              />

            </div>

          </div>

        )

      }

      {

        !nextBadge && (

          <div
            className="
              bg-white/10
              rounded-2xl
              p-5
              text-center
            "
          >

            🎉 Congratulations!

            <br />

            You have unlocked every badge.

          </div>

        )

      }

    </div>

  );

}

export default BadgeStats;