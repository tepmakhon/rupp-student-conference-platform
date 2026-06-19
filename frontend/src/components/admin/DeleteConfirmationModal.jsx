import {

  ExclamationTriangleIcon,

  XMarkIcon,

} from "@heroicons/react/24/outline";

import Button
from "../ui/Button";

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

        z-50

        flex

        items-center

        justify-center

        bg-black/50

        p-4

      "

    >

      <div

        className="

          w-full

          max-w-md

          bg-white

          rounded-2xl

          shadow-xl

          overflow-hidden

        "

      >

        {/* Header */}

        <div

          className="

            flex

            items-center

            justify-between

            border-b

            px-6

            py-5

          "

        >

          <div

            className="

              flex

              items-center

              gap-3

            "

          >

            <div

              className="

                p-2

                rounded-full

                bg-red-100

              "

            >

              <ExclamationTriangleIcon

                className="

                  w-6

                  h-6

                  text-red-600

                "

              />

            </div>

            <h2

              className="

                text-xl

                font-bold

                text-gray-800

              "

            >

              Delete Item

            </h2>

          </div>

          <button

            type="button"

            onClick={onClose}

            className="

              p-2

              rounded-lg

              hover:bg-gray-100

              transition

            "

          >

            <XMarkIcon

              className="

                w-5

                h-5

                text-gray-500

              "

            />

          </button>

        </div>

        {/* Body */}

        <div

          className="

            px-6

            py-8

          "

        >

          <p

            className="

              text-gray-600

              leading-relaxed

            "

          >

            Are you sure you want to delete

            <span

              className="

                font-semibold

                text-gray-900

                mx-1

              "

            >

              {title}

            </span>

            ?

          </p>

          <p

            className="

              text-sm

              text-gray-400

              mt-2

            "

          >

            This action cannot be undone.

          </p>

        </div>

        {/* Footer */}

        <div

          className="

            flex

            justify-end

            gap-4

            border-t

            px-6

            py-5

          "

        >

          <Button

            type="button"

            variant="outline"

            onClick={onClose}

          >

            Cancel

          </Button>

          <Button

            type="button"

            variant="danger"

            onClick={onConfirm}

          >

            Delete

          </Button>

        </div>

      </div>

    </div>

  );

}

export default DeleteConfirmationModal;