import AdminCrudPage
from "../../components/admin/AdminCrudPage";

import {

  getEventCategories,

  createEventCategory,

  updateEventCategory,

  deleteEventCategory,

}

from "../../api/eventCategoryApi";

function AdminEventCategoriesPage() {

  return (

    <AdminCrudPage

      title="Event Categories"

      description="Manage event categories used across the platform."

      entityName="Category"

      columns={[

        {

          key: "categoryName",

          label: "Category Name",

        },

      ]}

      formFields={[

        {

          name: "categoryName",

          label: "Category Name",

          placeholder:

            "Enter category name",

        },

      ]}

      getAll={

        getEventCategories

      }

      create={

        createEventCategory

      }

      update={

        updateEventCategory

      }

      remove={

        deleteEventCategory

      }

    />

  );

}

export default AdminEventCategoriesPage;