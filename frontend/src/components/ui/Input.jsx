import { useId } from "react";
function Input({
  label,
  id,

  type = "text",

  value,

  onChange,

  placeholder = "",

  required = false,

  disabled = false,

  className = "",
  ...rest
}) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={fieldId}
          className="

              block

              font-medium

              text-gray-700

            "
        >
          {label}
        </label>
      )}

      <input {...rest} id={fieldId}
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
