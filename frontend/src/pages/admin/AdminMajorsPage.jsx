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

import Textarea
from "../../components/ui/Textarea";

import {

  getMajors,

  createMajor,

  updateMajor,

  deleteMajor,

}

from "../../api/majorApi";

import {

  getFaculties,

}

from "../../api/facultyApi";

function AdminMajorsPage() {

  const [

    majors,

    setMajors,

  ] = useState([]);

  const [

    faculties,

    setFaculties,

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

    majorName: "",

    facultyId: "",

    description: "",

    careerPath: "",

  });

  const loadData =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          const [

            majorData,

            facultyData,

          ] = await Promise.all([

            getMajors(),

            getFaculties(),

          ]);

          setMajors(

            Array.isArray(

              majorData

            )

            ?

            majorData

            :

            []

          );

          setFaculties(

            Array.isArray(

              facultyData

            )

            ?

            facultyData

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

            "Failed to load majors"

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

          return majors;

        }

        return majors.filter(

          (item) =>

            item.majorName

            ?.toLowerCase()

            .includes(

              search.toLowerCase()

            )

        );

      },

      [

        majors,

        search,

      ]

    );

  const handleAdd =

    () => {

      setSelected(

        null

      );

      setForm({

        majorName: "",

        facultyId: "",

        description: "",

        careerPath: "",

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

        majorName:

          item.majorName

          || "",

        facultyId:

          item.facultyId

          || "",

        description:

          item.description

          || "",

        careerPath:

          item.careerPath

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

          await updateMajor(

            selected.id,

            form

          );

          toast.success(

            "Major updated"

          );

        }

        else {

          await createMajor(

            form

          );

          toast.success(

            "Major created"

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

        await deleteMajor(

          selected.id

        );

        toast.success(

          "Major deleted"

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

          title="Majors"

          description="Manage majors across the platform."

          addLabel="Add Major"

          onAdd={

            handleAdd

          }

        />

        <AdminDataTable

          columns={[

            {

              key:

              "majorName",

              label:

              "Major",

            },

            {

              key:

              "faculty",

              label:

              "Faculty",

              render:

              (item) =>

              item.faculty

              ?.facultyName,

            },

            {

              key:

              "careerPath",

              label:

              "Career Path",

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

            "Edit Major"

            :

            "Create Major"

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

            label="Major Name"

            value={

              form.majorName

            }

            placeholder="Enter major name"

            onChange={(e) =>

              setForm({

                ...form,

                majorName:

                e.target.value,

              })

            }

          />

          <Select

            label="Faculty"

            value={

              form.facultyId

            }

            options={

              faculties

            }

            optionValue="id"

            optionLabel="facultyName"

            placeholder="Select faculty"

            onChange={(e) =>

              setForm({

                ...form,

                facultyId:

                e.target.value,

              })

            }

          />

          <Textarea

            label="Description"

            rows={4}

            value={

              form.description

            }

            placeholder="Enter description"

            onChange={(e) =>

              setForm({

                ...form,

                description:

                e.target.value,

              })

            }

          />

          <Input

            label="Career Path"

            value={

              form.careerPath

            }

            placeholder="Enter career path"

            onChange={(e) =>

              setForm({

                ...form,

                careerPath:

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

            ?.majorName

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

export default AdminMajorsPage;