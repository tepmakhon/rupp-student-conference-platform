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

      .slice(0,10)

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

        rounded-3xl

        shadow-sm

        border

        p-10

        space-y-8

      "

    >

      {/* Title */}

      <div>

        <label

          className="

            block

            mb-3

            font-semibold

            text-primary

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

            rounded-2xl

            p-4

            focus:outline-none

            focus:ring-2

            focus:ring-secondary

          "

        />

      </div>

      {/* Type */}

      <div>

        <label

          className="

            block

            mb-3

            font-semibold

            text-primary

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

            rounded-2xl

            p-4

            focus:outline-none

            focus:ring-2

            focus:ring-secondary

          "

        >

          <option value="">

            Select Type

          </option>

          {

            opportunityTypes.map(

              (

                type

              ) => (

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

      {/* Description */}

      <div>

        <label

          className="

            block

            mb-3

            font-semibold

            text-primary

          "

        >

          Description

        </label>

        <textarea

          rows={6}

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

            rounded-2xl

            p-4

            focus:outline-none

            focus:ring-2

            focus:ring-secondary

          "

        />

      </div>

      {/* Requirements */}

      <div>

        <label

          className="

            block

            mb-3

            font-semibold

            text-primary

          "

        >

          Requirements

        </label>

        <textarea

          rows={6}

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

            rounded-2xl

            p-4

            focus:outline-none

            focus:ring-2

            focus:ring-secondary

          "

        />

      </div>

      <div

        className="

          grid

          md:grid-cols-2

          gap-8

        "

      >

        {/* Cover */}

        <div>

          <label

            className="

              block

              mb-3

              font-semibold

              text-primary

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

              rounded-2xl

              p-4

              focus:outline-none

              focus:ring-2

              focus:ring-secondary

            "

          />

        </div>

        {/* Deadline */}

        <div>

          <label

            className="

              block

              mb-3

              font-semibold

              text-primary

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

              rounded-2xl

              p-4

              focus:outline-none

              focus:ring-2

              focus:ring-secondary

            "

          />

        </div>

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

          py-4

          rounded-2xl

          font-semibold

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