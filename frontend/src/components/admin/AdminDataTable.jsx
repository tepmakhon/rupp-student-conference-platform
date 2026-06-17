import {

  PencilSquareIcon,

  TrashIcon,

  MagnifyingGlassIcon,

} from "@heroicons/react/24/outline";

function AdminDataTable({

  columns,

  data,

  loading = false,

  search = "",

  setSearch,

  onEdit,

  onDelete,

}) {

  return (

    <div className="space-y-5">

      <div className="relative">

        <MagnifyingGlassIcon

          className="

            absolute

            left-4

            top-3.5

            w-5

            h-5

            text-gray-400

          "

        />

        <input

          value={search}

          onChange={(e) =>

            setSearch?.(

              e.target.value

            )

          }

          placeholder="Search..."

          className="

            w-full

            border

            rounded-xl

            py-3

            pl-12

            pr-4

          "

        />

      </div>

      <div

        className="

          overflow-x-auto

          bg-white

          rounded-2xl

          shadow-md

        "

      >

        <table

          className="

            w-full

          "

        >

          <thead>

            <tr

              className="

                bg-gray-100

              "

            >

              {

                columns.map(

                  (column) => (

                    <th

                      key={column.key}

                      className="

                        p-4

                        text-left

                      "

                    >

                      {

                        column.label

                      }

                    </th>

                  )

                )

              }

              <th

                className="

                  p-4

                  text-center

                "

              >

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              loading

              ? (

                <tr>

                  <td

                    colSpan={

                      columns.length + 1

                    }

                    className="

                      p-10

                      text-center

                    "

                  >

                    Loading...

                  </td>

                </tr>

              )

              :

              data.length === 0

              ? (

                <tr>

                  <td

                    colSpan={

                      columns.length + 1

                    }

                    className="

                      p-10

                      text-center

                    "

                  >

                    No data found

                  </td>

                </tr>

              )

              :

              data.map(

                (item) => (

                  <tr

                    key={item.id}

                    className="

                      border-t

                    "

                  >

                    {

                      columns.map(

                        (column) => (

                          <td

                            key={column.key}

                            className="

                              p-4

                            "

                          >

                            {

                              column.render

                              ?

                              column.render(item)

                              :

                              item[column.key]

                            }

                          </td>

                        )

                      )

                    }

                    <td

                      className="

                        p-4

                      "

                    >

                      <div

                        className="

                          flex

                          justify-center

                          gap-3

                        "

                      >

                        <button

                          onClick={() =>

                            onEdit(item)

                          }

                        >

                          <PencilSquareIcon

                            className="

                              w-6

                              h-6

                              text-blue-600

                            "

                          />

                        </button>

                        <button

                          onClick={() =>

                            onDelete(item)

                          }

                        >

                          <TrashIcon

                            className="

                              w-6

                              h-6

                              text-red-600

                            "

                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminDataTable;