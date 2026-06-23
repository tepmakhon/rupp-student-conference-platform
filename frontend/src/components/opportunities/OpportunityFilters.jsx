function OpportunityFilters({

  keyword,

  setKeyword,

  typeId,

  setTypeId,

}) {

  return (

    <div

      className="

        bg-white

        p-6

        rounded-2xl

        shadow-sm

        border

        flex

        flex-col

        md:flex-row

        gap-4

      "

    >

      <input

        type="text"

        placeholder="Search opportunities..."

        value={keyword}

        onChange={(e) =>

          setKeyword(

            e.target.value

          )

        }

        className="

          flex-1

          border

          rounded-xl

          p-3

        "

      />

      <select

        value={typeId}

        onChange={(e) =>

          setTypeId(

            e.target.value

          )

        }

        className="

          border

          rounded-xl

          p-3

          md:w-60

        "

      >

        <option value="">

          All Types

        </option>

        <option value="1">

          Internship

        </option>

        <option value="2">

          Scholarship

        </option>

        <option value="3">

          Volunteer

        </option>

        <option value="4">

          Part-Time

        </option>

        <option value="5">

          Full-Time

        </option>

      </select>

    </div>

  );

}

export default OpportunityFilters;