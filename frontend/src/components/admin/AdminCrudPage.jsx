import {

  useEffect,

  useMemo,

  useState,

} from "react";

import toast
from "react-hot-toast";

import DashboardLayout
from "../layouts/DashboardLayout";

import AdminPageHeader
from "./AdminPageHeader";

import AdminDataTable
from "./AdminDataTable";

import AdminFormModal
from "./AdminFormModal";

import DeleteConfirmationModal
from "./DeleteConfirmationModal";

function AdminCrudPage({

  title,

  description,

  entityName,

  columns,

  formFields,

  getAll,

  create,

  update,

  remove,

}) {

  const [

    items,

    setItems,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    search,

    setSearch,

  ] = useState("");

  const [

    modalOpen,

    setModalOpen,

  ] = useState(false);

  const [

    deleteOpen,

    setDeleteOpen,

  ] = useState(false);

  const [

    selected,

    setSelected,

  ] = useState(null);

  const [

    form,

    setForm,

  ] = useState({});

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
  async () => {

    try {

      setLoading(
        true
      );

      const data =

        await getAll();

      setItems(

        Array.isArray(data)

        ? data

        : []

      );

    }

    catch (error) {

      console.error(
        error
      );

      toast.error(

        `Failed to load ${entityName}`

      );

    }

    finally {

      setLoading(
        false
      );

    }

  };

  const filtered =
  useMemo(() => {

    if (!search) {

      return items;

    }

    return items.filter(

      (item) =>

        JSON.stringify(item)

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );

  },

  [

    items,

    search,

  ]);

  const handleAdd =
  () => {

    setSelected(
      null
    );

    const initial = {};

    formFields.forEach(

      (field) => {

        initial[

          field.name

        ] =

        field.defaultValue ||

        "";

      }

    );

    formFields.forEach(

      (field) => {

        initial[field.name] = "";

      }

    );

    setForm(
      initial
    );

    setModalOpen(
      true
    );

  };

  const handleEdit =
  (item) => {

    setSelected(
      item
    );

    const values = {};

    formFields.forEach(

      (field) => {

        values[

          field.name

        ] =

        item[

          field.name

        ] ?? "";

      }

    );

    formFields.forEach(

      (field) => {

        values[field.name] =

          item[field.name]

          || "";

      }

    );

    setForm(
      values
    );

    setModalOpen(
      true
    );

  };

  const handleSubmit =
  async (
    e
  ) => {

    e.preventDefault();

    try {

      if (selected) {

        await update(

          selected.id,

          form

        );

        toast.success(

          `${entityName} updated`

        );

      }

      else {

        await create(
          form
        );

        toast.success(

          `${entityName} created`

        );

      }

      setModalOpen(
        false
      );

      loadData();

    }

    catch (error) {

      console.error(
        error
      );

      toast.error(

        error?.response

        ?.data?.message ||

        "Operation failed"

      );

    }

  };

  const handleDelete =
  async () => {

    try {

      await remove(

        selected.id

      );

      toast.success(

        `${entityName} deleted`

      );

      setDeleteOpen(
        false
      );

      loadData();

    }

    catch (error) {

      console.error(
        error
      );

      toast.error(

        error?.response

        ?.data?.message ||

        "Delete failed"

      );

    }

  };

  return (

    <DashboardLayout>

      <div

        className="

          max-w-7xl

          mx-auto

        "

      >

        <AdminPageHeader

          title={title}

          description={description}

          addLabel={`Add ${entityName}`}

          onAdd={handleAdd}

        />

        <AdminDataTable

          columns={columns}

          data={filtered}

          loading={loading}

          search={search}

          setSearch={setSearch}

          onEdit={handleEdit}

          onDelete={(item) => {

            setSelected(
              item
            );

            setDeleteOpen(
              true
            );

          }}

        />

        <AdminFormModal

          open={modalOpen}

          title={

            selected

            ?

            `Edit ${entityName}`

            :

            `Create ${entityName}`

          }

          onClose={() =>

            setModalOpen(
              false
            )

          }

          onSubmit={

            handleSubmit

          }

        >

        {
          formFields.map(

            (field) => (

              <div

                key={field.name}

                className="space-y-2"

              >

                <label

                  className="

                    block

                    font-medium

                    text-gray-700

                  "

                >

                  {field.label}

                </label>

                {/* TEXTAREA */}

                {

                  field.type ===

                  "textarea"

                  && (

                    <textarea

                      rows={4}

                      value={

                        form[

                          field.name

                        ] || ""

                      }

                      onChange={(e) =>

                        setForm({

                          ...form,

                          [

                            field.name

                          ]:

                          e.target.value,

                        })

                      }

                      placeholder={

                        field.placeholder

                      }

                      className="

                        w-full

                        border

                        rounded-xl

                        p-3

                      "

                    />

                  )

                }

                {/* SELECT */}

                {

                  field.type ===

                  "select"

                  && (

                    <select

                      value={

                        form[

                          field.name

                        ] || ""

                      }

                      onChange={(e) =>

                        setForm({

                          ...form,

                          [

                            field.name

                          ]:

                          e.target.value,

                        })

                      }

                      className="

                        w-full

                        border

                        rounded-xl

                        p-3

                      "

                    >

                      <option value="">

                        Select

                      </option>

                      {

                        field.options

                        ?.map(

                          (option) => (

                            <option

                              key={

                                option[

                                  field.optionValue ||

                                  "id"

                                ]

                              }

                              value={

                                option[

                                  field.optionValue ||

                                  "id"

                                ]

                              }

                            >

                              {

                                option[

                                  field.optionLabel ||

                                  "name"

                                ]

                              }

                            </option>

                          )

                        )

                      }

                    </select>

                  )

                }

                {/* INPUT */}

                {

                  (

                    !field.type ||

                    field.type ===

                    "text" ||

                    field.type ===

                    "number"

                  )

                  && (

                    <input

                      type={

                        field.type ||

                        "text"

                      }

                      value={

                        form[

                          field.name

                        ] || ""

                      }

                      onChange={(e) =>

                        setForm({

                          ...form,

                          [

                            field.name

                          ]:

                          e.target.value,

                        })

                      }

                      placeholder={

                        field.placeholder

                      }

                      disabled={

                        field.disabled

                      }

                      className="

                        w-full

                        border

                        rounded-xl

                        p-3

                      "

                    />

                  )

                }

              </div>

            )

          )
        }

        </AdminFormModal>

        <DeleteConfirmationModal

          open={deleteOpen}

          title={

            selected?.name ||

            selected?.title ||

            selected?.categoryName ||

            ""

          }

          onClose={() =>

            setDeleteOpen(
              false
            )

          }

          onConfirm={

            handleDelete

          }

        />

      </div>

    </DashboardLayout>

  );

}

export default AdminCrudPage;