import {

  useEffect,

  useState,

} from "react";

import toast

from "react-hot-toast";

import {

  getSkills,

} from "../../api/skillApi";

function EditProfileSkills({

  selectedSkills,

  setSelectedSkills,

}) {

  const [

    skills,

    setSkills,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(false);

  useEffect(() => {

    loadSkills();

  }, []);

  const loadSkills =

  async () => {

    try {

      setLoading(

        true

      );

      const data =

      await getSkills();

      setSkills(

        data ||

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

        "Failed to load skills"

      );

    }

    finally {

      setLoading(

        false

      );

    }

  };

  const toggleSkill =

  (

    skillId

  ) => {

    const exists =

    selectedSkills.includes(

      skillId

    );

    if (

      exists

    ) {

      setSelectedSkills(

        selectedSkills.filter(

          (

            id

          ) =>

          id !== skillId

        )

      );

      return;

    }

    setSelectedSkills([

      ...selectedSkills,

      skillId,

    ]);

  };

  if (

    loading

  ) {

    return (

      <div

        className="

        text-gray-500

        "

      >

        Loading skills...

      </div>

    );

  }

  return (

    <div>

      <h3

        className="

        text-2xl

        font-bold

        text-primary

        mb-6

        "

      >

        Skills

      </h3>

      <div

        className="

        flex

        flex-wrap

        gap-3

        "

      >

        {

          skills.map(

            (

              skill

            ) => {

              const active =

              selectedSkills.includes(

                skill.id

              );

              return (

                <button

                  key={

                    skill.id

                  }

                  type="button"

                  onClick={() =>

                    toggleSkill(

                      skill.id

                    )

                  }

                  className={`

                  px-4

                  py-2

                  rounded-full

                  border

                  transition

                  ${

                    active

                    ?

                    "bg-primary text-white border-primary"

                    :

                    "bg-white text-gray-700"

                  }

                  `}

                >

                  {

                    skill.skillName

                  }

                </button>

              );

            }

          )

        }

      </div>

    </div>

  );

}

export default EditProfileSkills;