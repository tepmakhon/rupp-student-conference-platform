import AdminCrudPage
from "../../components/admin/AdminCrudPage";

import {

  getUniversities,

  createUniversity,

  updateUniversity,

  deleteUniversity,

}

from "../../api/universityApi";

function AdminUniversitiesPage() {

  return (

    <AdminCrudPage

      title="Universities"

      description="Manage universities available across the platform."

      entityName="University"

      columns={[

        {

          key: "universityName",

          label: "University Name",

        },

      ]}

      formFields={[

        {

          name: "universityName",

          label: "University Name",

        },

      ]}

      getAll={

        getUniversities

      }

      create={

        createUniversity

      }

      update={

        updateUniversity

      }

      remove={

        deleteUniversity

      }

    />

  );

}

export default AdminUniversitiesPage;