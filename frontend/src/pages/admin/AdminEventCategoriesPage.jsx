import {

  useEffect,

  useMemo,

  useState,

} from "react";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import AdminPageHeader
from "../../components/admin/AdminPageHeader";

import AdminDataTable
from "../../components/admin/AdminDataTable";

import AdminFormModal
from "../../components/admin/AdminFormModal";

import DeleteConfirmationModal
from "../../components/admin/DeleteConfirmationModal";

import {

  getEventCategories,

  createEventCategory,

  updateEventCategory,

  deleteEventCategory,

}

from "../../api/eventCategoryApi";

function AdminEventCategoriesPage() {

  const [

    categories,

    setCategories,

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

    submitting,

    setSubmitting,

  ] = useState(false);

  const [

    form,

    setForm,

  ] = useState({

    categoryName: "",

  });

  useEffect(() => {

    loadCategories();

  }, []);

  const loadCategories =
  async () => {

    try {

      setLoading(
        true
      );

      const data =

        await getEventCategories();

      setCategories(

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

        "Failed to load categories"

      );

    }

    finally {

      setLoading(
        false
      );

    }

  };

  const filteredCategories =
  useMemo(() => {

    return categories.filter(

      (item) =>

        item.categoryName

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );

  },

  [

    categories,

    search,

  ]);

  const handleAdd =
  () => {

    setSelected(
      null
    );

    setForm({

      categoryName: "",

    });

    setModalOpen(
      true
    );

  };

  const handleEdit =
  (item) => {

    setSelected(
      item
    );

    setForm({

      categoryName:

        item.categoryName,

    });

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

      setSubmitting(
        true
      );

      if (selected) {

        await updateEventCategory(

          selected.id,

          form

        );

        toast.success(

          "Category updated"

        );

      }

      else {

        await createEventCategory(

          form

        );

        toast.success(

          "Category created"

        );

      }

      setModalOpen(
        false
      );

      loadCategories();

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

    finally {

      setSubmitting(
        false
      );

    }

  };

  const handleDelete =
  async () => {

    try {

      await deleteEventCategory(

        selected.id

      );

      toast.success(

        "Category deleted"

      );

      setDeleteOpen(
        false
      );

      loadCategories();

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

          title="Event Categories"

          description="Manage event categories used across the platform."

          addLabel="Add Category"

          onAdd={handleAdd}

        />

        <AdminDataTable

          columns={[

            {

              key: "categoryName",

              label: "Category",

            },

          ]}

          data={

            filteredCategories

          }

          loading={

            loading

          }

          search={

            search

          }

          setSearch={

            setSearch

          }

          onEdit={

            handleEdit

          }

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

          open={

            modalOpen

          }

          title={

            selected

            ?

            "Edit Category"

            :

            "Create Category"

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

          <div>

            <label

              className="

                block

                font-medium

                mb-2

              "

            >

              Category Name

            </label>

            <input

              value={

                form.categoryName

              }

              onChange={(e) =>

                setForm({

                  categoryName:

                    e.target.value,

                })

              }

              required

              className="

                w-full

                border

                rounded-xl

                p-3

              "

            />

          </div>

          <button

            type="submit"

            disabled={

              submitting

            }

            className="

              w-full

              bg-primary

              hover:bg-secondary

              text-white

              py-3

              rounded-xl

              transition

              disabled:opacity-50

            "

          >

            {

              submitting

              ?

              "Saving..."

              :

              selected

              ?

              "Update Category"

              :

              "Create Category"

            }

          </button>

        </AdminFormModal>

        <DeleteConfirmationModal

          open={

            deleteOpen

          }

          title={

            selected

            ?.categoryName

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

export default AdminEventCategoriesPage;