import { useId } from "react";
function Textarea({
  label,
  id,

  value,

  onChange,

  placeholder = "",

  rows = 4,

  required = false,

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

      <textarea {...rest} id={fieldId}
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
