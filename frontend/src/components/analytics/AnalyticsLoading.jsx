function AnalyticsLoading() {

  return (

    <div
      className="
        grid
        md:grid-cols-3
        gap-6
      "
    >

      {

        [1,2,3,4,5,6].map(item => (

          <div

            key={item}

            className="
              h-40
              rounded-3xl
              bg-gray-200
              animate-pulse
            "

          />

        ))

      }

    </div>

  );

}

export default AnalyticsLoading;