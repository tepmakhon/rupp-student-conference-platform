function Select({
  label,

  value,

  onChange,

  options = [],

  placeholder = "Select",

  optionValue = "id",

  optionLabel = "name",

  required = false,

  className = "",
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          className="

              block

              font-medium

              text-gray-700

            "
        >
          {label}
        </label>
      )}

      <select
        value={value}

        required={required}

        onChange={onChange}

        className={`

          w-full

          border

          border-gray-300

          rounded-xl

          p-3

          focus:outline-none

          focus:ring-2

          focus:ring-secondary

          ${className}

        `}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option[optionValue]}

            value={option[optionValue]}
          >
            {option[optionLabel]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
