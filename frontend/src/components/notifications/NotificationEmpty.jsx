import { BellSlashIcon } from "@heroicons/react/24/outline";

function NotificationEmpty() {
  return (
    <div
      className="

        bg-white

        rounded-3xl

        shadow-md

        p-16

      "
    >
      <div
        className="

          flex

          flex-col

          items-center

          justify-center

          text-center

        "
      >
        <div
          className="

            w-20

            h-20

            rounded-full

            bg-gray-100

            flex

            items-center

            justify-center

          "
        >
          <BellSlashIcon
            className="

              w-10

              h-10

              text-gray-400

            "
          />
        </div>

        <h3
          className="

            text-2xl

            font-bold

            text-primary

            mt-6

          "
        >
          No Notifications
        </h3>

        <p
          className="

            text-gray-500

            mt-3

          "
        >
          You're all caught up.
        </p>
      </div>
    </div>
  );
}

export default NotificationEmpty;
