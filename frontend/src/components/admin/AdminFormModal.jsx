function AdminFormModal({

  open,

  title,

  children,

  onClose,

  onSubmit,

}) {

  if (!open) {

    return null;

  }

  return (

    <div

      className="

        fixed

        inset-0

        bg-black/50

        flex

        items-center

        justify-center

        z-50

      "

    >

      <div

        className="

          bg-white

          rounded-2xl

          w-full

          max-w-xl

          p-8

        "

      >

        <div

          className="

            flex

            justify-between

            mb-6

          "

        >

          <h2

            className="

              text-2xl

              font-bold

            "

          >

            {title}

          </h2>

          <button

            onClick={onClose}

          >

            ✕

          </button>

        </div>

        <form

          onSubmit={onSubmit}

          className="space-y-5"

        >

          {children}

          <button

            className="

              w-full

              bg-primary

              text-white

              py-3

              rounded-xl

            "

          >

            Save

          </button>

        </form>

      </div>

    </div>

  );

}

export default AdminFormModal;