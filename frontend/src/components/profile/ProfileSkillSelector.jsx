import { useEffect, useState } from "react";

import { getSkills } from "../../api/skillApi";

function ProfileSkillSelector({
  value = [],

  onChange,
}) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const data = await getSkills();

    setSkills(data);
  };

  const toggleSkill = (skillId) => {
    if (value.includes(skillId)) {
      onChange(value.filter((id) => id !== skillId));

      return;
    }

    onChange([...value, skillId]);
  };

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
        {skills.map((skill) => (
          <button
            key={skill.id}

            type="button"

            onClick={() => toggleSkill(skill.id)}

            className={`

                  px-5

                  py-3

                  rounded-2xl

                  font-semibold

                  border

                  transition

                  ${
                    value.includes(skill.id)
                      ? "bg-primary text-white"
                      : "bg-white"
                  }

                `}
          >
            {skill.skillName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfileSkillSelector;
