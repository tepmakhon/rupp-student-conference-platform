import {

  useState,

} from "react";

function OpportunityForm({

  initialData = {},

  opportunityTypes = [],

  loading = false,

  onSubmit,

}) {

  const [

    form,

    setForm,

  ] = useState({

    title:

      initialData.title || "",

    description:

      initialData.description || "",

    requirements:

      initialData.requirements || "",

    coverImageUrl:

      initialData.coverImageUrl || "",

    deadline:

      initialData.deadline

      ?

      initialData.deadline

      .slice(0, 10)

      :

      "",

    typeId:

      initialData.typeId || "",

  });

  const handleChange =

    (e) => {

      const {

        name,

        value,

      } = e.target;

      setForm({

        ...form,

        [name]:

        value,

      });

    };

  const handleSubmit =

    (e) => {

      e.preventDefault();

      onSubmit?.(

        form

      );

    };

  return (

    <form

      onSubmit={

        handleSubmit

      }

      className="

        bg-white

        rounded-2xl

        shadow-md

        p-8

        space-y-6

      "

    >

      <div>

        <label

          className="

            block

            mb-2

            font-medium

          "

        >

          Title

        </label>

        <input

          type="text"

          name="title"

          value={

            form.title

          }

          onChange={

            handleChange

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

      <div>

        <label

          className="

            block

            mb-2

            font-medium

          "

        >

          Opportunity Type

        </label>

        <select

          name="typeId"

          value={

            form.typeId

          }

          onChange={

            handleChange

          }

          required

          className="

            w-full

            border

            rounded-xl

            p-3

          "

        >

          <option value="">

            Select Type

          </option>

          {

            opportunityTypes.map(

              (type) => (

                <option

                  key={

                    type.id

                  }

                  value={

                    type.id

                  }

                >

                  {

                    type.typeName

                  }

                </option>

              )

            )

          }

        </select>

      </div>

      <div>

        <label

          className="

            block

            mb-2

            font-medium

          "

        >

          Description

        </label>

        <textarea

          rows={5}

          name="description"

          value={

            form.description

          }

          onChange={

            handleChange

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

      <div>

        <label

          className="

            block

            mb-2

            font-medium

          "

        >

          Requirements

        </label>

        <textarea

          rows={5}

          name="requirements"

          value={

            form.requirements

          }

          onChange={

            handleChange

          }

          className="

            w-full

            border

            rounded-xl

            p-3

          "

        />

      </div>

      <div>

        <label

          className="

            block

            mb-2

            font-medium

          "

        >

          Cover Image URL

        </label>

        <input

          type="text"

          name="coverImageUrl"

          value={

            form.coverImageUrl

          }

          onChange={

            handleChange

          }

          className="

            w-full

            border

            rounded-xl

            p-3

          "

        />

      </div>

      <div>

        <label

          className="

            block

            mb-2

            font-medium

          "

        >

          Deadline

        </label>

        <input

          type="date"

          name="deadline"

          value={

            form.deadline

          }

          onChange={

            handleChange

          }

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

          loading

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

          loading

          ?

          "Saving..."

          :

          "Save Opportunity"

        }

      </button>

    </form>

  );

}

export default OpportunityForm;