import {

  useEffect,

  useMemo,

  useState,

  useCallback,

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

import Input
from "../../components/ui/Input";

import Select
from "../../components/ui/Select";

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

  const loadData =

    useCallback(

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

            Array.isArray(

              facultyData

            )

            ?

            facultyData

            :

            []

          );

          setUniversities(

            Array.isArray(

              universityData

            )

            ?

            universityData

            :

            []

          );

        }

        catch (

          error

        ) {

          console.error(

            error

          );

          toast.error(

            "Failed to load faculties"

          );

        }

        finally {

          setLoading(

            false

          );

        }

      },

      []

    );

  useEffect(() => {

    loadData();

  },

  [

    loadData,

  ]);

  const filtered =

    useMemo(

      () => {

        if (

          !search

        ) {

          return faculties;

        }

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

      ]

    );

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

          item.facultyName

          || "",

        universityId:

          item.universityId

          || "",

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

        if (

          selected

        ) {

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

      catch (

        error

      ) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message

          ||

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

      catch (

        error

      ) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message

          ||

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

          description="Manage faculties and universities."

          addLabel="Add Faculty"

          onAdd={

            handleAdd

          }

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

          data={

            filtered

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

          <Input

            label="Faculty Name"

            value={

              form.facultyName

            }

            placeholder="Enter faculty name"

            onChange={(e) =>

              setForm({

                ...form,

                facultyName:

                e.target.value,

              })

            }

          />

          <Select

            label="University"

            value={

              form.universityId

            }

            options={

              universities

            }

            optionValue="id"

            optionLabel="universityName"

            placeholder="Select university"

            onChange={(e) =>

              setForm({

                ...form,

                universityId:

                e.target.value,

              })

            }

          />

        </AdminFormModal>

        <DeleteConfirmationModal

          open={

            deleteOpen

          }

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