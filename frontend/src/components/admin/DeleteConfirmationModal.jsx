function DeleteConfirmationModal({

  open,

  title,

  onClose,

  onConfirm,

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

          p-8

          w-full

          max-w-md

        "

      >

        <h2

          className="

            text-2xl

            font-bold

            mb-4

          "

        >

          Delete Item

        </h2>

        <p

          className="

            text-gray-500

            mb-8

          "

        >

          Delete {title} ?

        </p>

        <div

          className="

            flex

            gap-4

          "

        >

          <button

            onClick={onClose}

            className="

              flex-1

              border

              py-3

              rounded-xl

            "

          >

            Cancel

          </button>

          <button

            onClick={onConfirm}

            className="

              flex-1

              bg-red-600

              text-white

              py-3

              rounded-xl

            "

          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteConfirmationModal;