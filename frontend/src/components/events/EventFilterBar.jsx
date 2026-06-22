function EventFilterBar({

  categories,

  value,

  onChange,

}) {

  return (

    <select

      value={value}

      onChange={(e) =>

        onChange(

          e.target.value

        )

      }

      className="

        border

        rounded-xl

        px-4

        py-3

      "

    >

      <option value="">

        All Categories

      </option>

      {

        categories.map(

          (

            category

          ) => (

            <option

              key={

                category.id

              }

              value={

                category.id

              }

            >

              {

                category.categoryName

              }

            </option>

          )

        )

      }

    </select>

  );

}

export default EventFilterBar;