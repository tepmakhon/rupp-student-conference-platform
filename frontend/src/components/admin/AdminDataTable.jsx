import {

  PencilSquareIcon,

  TrashIcon,

  MagnifyingGlassIcon,

} from "@heroicons/react/24/outline";

import Input
from "../ui/Input";

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

    <div

      className="

        space-y-6

      "

    >

      {/* Search */}

      <div

        className="

          relative

          max-w-md

        "

      >

        <MagnifyingGlassIcon

          className="

            absolute

            left-4

            top-1/2

            -translate-y-1/2

            w-5

            h-5

            text-gray-400

            z-10

          "

        />

        <Input

          value={

            search

          }

          placeholder="Search..."

          onChange={(e) =>

            setSearch?.(

              e.target.value

            )

          }

          className="

            pl-12

          "

        />

      </div>

      {/* Table */}

      <div

        className="

          overflow-hidden

          bg-white

          rounded-2xl

          border

          border-gray-100

          shadow-sm

        "

      >

        <div

          className="

            overflow-x-auto

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

                  bg-gray-50

                "

              >

                {

                  columns.map(

                    (column) => (

                      <th

                        key={

                          column.key

                        }

                        className="

                          px-6

                          py-4

                          text-left

                          text-sm

                          font-semibold

                          text-gray-700

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

                    px-6

                    py-4

                    text-center

                    text-sm

                    font-semibold

                    text-gray-700

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

                        columns.length

                        + 1

                      }

                      className="

                        py-16

                        text-center

                        text-gray-500

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

                        columns.length

                        + 1

                      }

                      className="

                        py-16

                        text-center

                        text-gray-500

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

                      key={

                        item.id

                      }

                      className="

                        border-t

                        hover:bg-gray-50

                        transition

                      "

                    >

                      {

                        columns.map(

                          (column) => (

                            <td

                              key={

                                column.key

                              }

                              className="

                                px-6

                                py-5

                                text-gray-700

                              "

                            >

                              {

                                column.render

                                ?

                                column.render(

                                  item

                                )

                                :

                                item[

                                  column.key

                                ]

                              }

                            </td>

                          )

                        )

                      }

                      <td

                        className="

                          px-6

                          py-5

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

                            type="button"

                            onClick={() =>

                              onEdit(

                                item

                              )

                            }

                            className="

                              p-2

                              rounded-lg

                              hover:bg-blue-100

                              transition

                            "

                          >

                            <PencilSquareIcon

                              className="

                                w-5

                                h-5

                                text-blue-600

                              "

                            />

                          </button>

                          <button

                            type="button"

                            onClick={() =>

                              onDelete(

                                item

                              )

                            }

                            className="

                              p-2

                              rounded-lg

                              hover:bg-red-100

                              transition

                            "

                          >

                            <TrashIcon

                              className="

                                w-5

                                h-5

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

    </div>

  );

}

export default AdminDataTable;