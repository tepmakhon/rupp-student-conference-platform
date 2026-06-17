import AdminCrudPage
from "../../components/admin/AdminCrudPage";

import {

  getOpportunityTypes,

  createOpportunityType,

  updateOpportunityType,

  deleteOpportunityType,

}

from "../../api/opportunityTypeApi";

function AdminOpportunityTypesPage() {

  return (

    <AdminCrudPage

      title="Opportunity Types"

      description="Manage opportunity types used throughout the platform."

      entityName="Opportunity Type"

      columns={[

        {

          key: "typeName",

          label: "Type Name",

        },

      ]}

      formFields={[

        {

          name: "typeName",

          label: "Type Name",

        },

      ]}

      getAll={

        getOpportunityTypes

      }

      create={

        createOpportunityType

      }

      update={

        updateOpportunityType

      }

      remove={

        deleteOpportunityType

      }

    />

  );

}

export default AdminOpportunityTypesPage;