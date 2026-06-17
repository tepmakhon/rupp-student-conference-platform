import AdminCrudPage
from "../../components/admin/AdminCrudPage";

import {

  getSkills,

  createSkill,

  updateSkill,

  deleteSkill,

}

from "../../api/skillApi";

function AdminSkillsPage() {

  return (

    <AdminCrudPage

      title="Skills"

      description="Manage skills used across the platform."

      entityName="Skill"

      columns={[

        {

          key: "skillName",

          label: "Skill Name",

        },

      ]}

      formFields={[

        {

          name: "skillName",

          label: "Skill Name",

          placeholder:

            "Enter skill name",

        },

      ]}

      getAll={

        getSkills

      }

      create={

        createSkill

      }

      update={

        updateSkill

      }

      remove={

        deleteSkill

      }

    />

  );

}

export default AdminSkillsPage;