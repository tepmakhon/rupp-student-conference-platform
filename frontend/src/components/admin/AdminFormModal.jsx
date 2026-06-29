import { XMarkIcon } from "@heroicons/react/24/outline";

import Button from "../ui/Button";

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

          max-w-2xl

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

            px-8

            py-5

          "
        >
          <h2
            className="

              text-2xl

              font-bold

              text-primary

            "
          >
            {title}
          </h2>

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

                w-6

                h-6

                text-gray-500

              "
            />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={onSubmit}

          className="

            p-8

            space-y-6

          "
        >
          {children}

          <div
            className="

              flex

              justify-end

              gap-4

              pt-4

            "
          >
            <Button
              type="button"

              variant="outline"

              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminFormModal;
