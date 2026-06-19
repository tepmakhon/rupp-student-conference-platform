function Textarea({

  label,

  value,

  onChange,

  placeholder = "",

  rows = 4,

  required = false,

  className = "",

}) {

  return (

    <div

      className="space-y-2"

    >

      {

        label && (

          <label

            className="

              block

              font-medium

              text-gray-700

            "

          >

            {label}

          </label>

        )

      }

      <textarea

        rows={rows}

        value={value}

        required={required}

        placeholder={placeholder}

        onChange={onChange}

        className={`

          w-full

          border

          border-gray-300

          rounded-xl

          p-3

          resize-none

          focus:outline-none

          focus:ring-2

          focus:ring-secondary

          ${className}

        `}

      />

    </div>

  );

}

export default Textarea;