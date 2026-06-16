function PrimaryButton({

  children,

  loading,

  ...props

}) {

  return (

    <button

      {...props}

      disabled={loading}

      className="

        bg-primary

        hover:bg-secondary

        text-white

        px-5

        py-3

        rounded-xl

        transition

        disabled:opacity-50

      "

    >

      {children}

    </button>

  );

}

export default PrimaryButton;