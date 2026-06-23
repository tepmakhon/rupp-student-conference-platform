function OpportunityDeadlineBadge({

  deadline,

}) {

  if (!deadline) {

    return null;

  }

  const expired =

    new Date(deadline)

    <

    new Date();

  return (

    <span

      className={`

        px-3

        py-1

        rounded-full

        text-xs

        font-semibold

        ${

          expired

          ?

          "bg-red-100 text-red-700"

          :

          "bg-green-100 text-green-700"

        }

      `}

    >

      {

        expired

        ?

        "Expired"

        :

        "Open"

      }

    </span>

  );

}

export default OpportunityDeadlineBadge;