function Button({
  children,

  type = "button",

  variant = "primary",

  fullWidth = false,

  disabled = false,

  onClick,

  className = "",
}) {
  const variants = {
    primary: `
      bg-primary
      hover:bg-secondary
      text-white
      `,

    secondary: `
      bg-gray-200
      hover:bg-gray-300
      text-gray-800
      `,

    danger: `
      bg-red-600
      hover:bg-red-700
      text-white
      `,

    outline: `
      border
      border-gray-300
      hover:bg-gray-100
      text-gray-700
      `,
  };

  return (
    <button
      type={type}

      disabled={disabled}

      onClick={onClick}

      className={`

        px-5

        py-3

        rounded-xl

        font-semibold

        transition

        duration-200

        disabled:opacity-50

        disabled:cursor-not-allowed

        ${fullWidth ? "w-full" : ""}

        ${variants[variant]}

        ${className}

      `}
    >
      {children}
    </button>
  );
}

export default Button;
