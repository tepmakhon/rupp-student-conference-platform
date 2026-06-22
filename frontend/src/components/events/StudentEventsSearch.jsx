function StudentEventsSearch({

  value,

  onChange,

}) {

  return (

    <input

      type="text"

      placeholder="Search my events..."

      value={value}

      onChange={(e) =>

        onChange(

          e.target.value

        )

      }

      className="

        w-full

        md:w-96

        border

        rounded-xl

        px-4

        py-3

      "

    />

  );

}

export default StudentEventsSearch;