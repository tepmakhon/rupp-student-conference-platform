function Input({
  label,

  type = "text",

  value,

  onChange,

  placeholder = "",

  required = false,

  disabled = false,

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

      <input
        type={type}

        value={value}

        required={required}

        disabled={disabled}

        placeholder={placeholder}

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

          disabled:bg-gray-100

          ${className}

        `}
      />
    </div>
  );
}

export default Input;
