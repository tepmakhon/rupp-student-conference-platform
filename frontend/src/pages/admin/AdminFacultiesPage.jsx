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

  getFaculties,

  createFaculty,

  updateFaculty,

  deleteFaculty,

}

from "../../api/facultyApi";

import {

  getUniversities,

}

from "../../api/universityApi";

function AdminFacultiesPage() {

  const [

    faculties,

    setFaculties,

  ] = useState([]);

  const [

    universities,

    setUniversities,

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

  ] = useState({

    facultyName: "",

    universityId: "",

  });

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
  async () => {

    try {

      setLoading(
        true
      );

      const [

        facultyData,

        universityData,

      ] = await Promise.all([

        getFaculties(),

        getUniversities(),

      ]);

      setFaculties(

        facultyData

      );

      setUniversities(

        universityData

      );

    }

    catch (error) {

      console.error(
        error
      );

      toast.error(

        "Failed to load data"

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

    return faculties.filter(

      (item) =>

        item.facultyName

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );

  },

  [

    faculties,

    search,

  ]);

  const handleAdd =
  () => {

    setSelected(
      null
    );

    setForm({

      facultyName: "",

      universityId: "",

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

      facultyName:

        item.facultyName,

      universityId:

        item.universityId,

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

      if (selected) {

        await updateFaculty(

          selected.id,

          form

        );

        toast.success(

          "Faculty updated"

        );

      }

      else {

        await createFaculty(

          form

        );

        toast.success(

          "Faculty created"

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

      await deleteFaculty(

        selected.id

      );

      toast.success(

        "Faculty deleted"

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

          title="Faculties"

          description="Manage faculties."

          addLabel="Add Faculty"

          onAdd={handleAdd}

        />

        <AdminDataTable

          columns={[

            {

              key:

              "facultyName",

              label:

              "Faculty",

            },

            {

              key:

              "university",

              label:

              "University",

              render:

              (item) =>

              item.university

              ?.universityName,

            },

          ]}

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

            "Edit Faculty"

            :

            "Create Faculty"

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

            <label>

              Faculty Name

            </label>

            <input

              value={

                form.facultyName

              }

              onChange={(e) =>

                setForm({

                  ...form,

                  facultyName:

                  e.target.value,

                })

              }

              className="

                w-full

                border

                p-3

                rounded-xl

              "

            />

          </div>

          <div>

            <label>

              University

            </label>

            <select

              value={

                form.universityId

              }

              onChange={(e) =>

                setForm({

                  ...form,

                  universityId:

                  e.target.value,

                })

              }

              className="

                w-full

                border

                p-3

                rounded-xl

              "

            >

              <option value="">

                Select

              </option>

              {

                universities.map(

                  (

                    university

                  ) => (

                    <option

                      key={

                        university.id

                      }

                      value={

                        university.id

                      }

                    >

                      {

                        university.universityName

                      }

                    </option>

                  )

                )

              }

            </select>

          </div>

        </AdminFormModal>

        <DeleteConfirmationModal

          open={deleteOpen}

          title={

            selected

            ?.facultyName

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

export default AdminFacultiesPage;