import {
  useEffect,
  useState,
} from "react";

import {
  BellIcon,
} from "@heroicons/react/24/outline";

import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from "../../api/notificationApi";

import toast
from "react-hot-toast";

function NotificationDropdown() {

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    open,
    setOpen,
  ] = useState(false);

  useEffect(() => {

    loadNotifications();

  }, []);

  const loadNotifications =
    async () => {

      try {

        const data =
          await getNotifications();

        setNotifications(data);

      } catch (error) {

        console.error(error);

      }
    };

  const unreadCount =
    notifications.filter(
      (n) => !n.isRead
    ).length;

  const handleRead =
    async (id) => {

      try {

        await readNotification(id);

        setNotifications(
          notifications.map(
            (notification) =>
              notification.id === id
                ? {
                    ...notification,
                    isRead: true,
                  }
                : notification
          )
        );

      } catch (error) {

        console.error(error);

      }
    };

  const handleReadAll =
    async () => {

      try {

        await readAllNotifications();

        setNotifications(
          notifications.map(
            (notification) => ({
              ...notification,
              isRead: true,
            })
          )
        );

        toast.success(
          "All notifications marked as read"
        );

      } catch (error) {

        console.error(error);

      }
    };

  return (

    <div className="relative">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          relative
          p-2
        "
      >

        <BellIcon
          className="
            w-7
            h-7
            text-primary
          "
        />

        {
          unreadCount > 0 && (

            <span
              className="
                absolute
                -top-1
                -right-1
                bg-red-500
                text-white
                text-xs
                rounded-full
                px-2
              "
            >
              {unreadCount}
            </span>

          )
        }

      </button>

      {
        open && (

          <div
            className="
              absolute
              right-0
              mt-3
              w-96
              bg-white
              rounded-2xl
              shadow-xl
              z-50
              max-h-96
              overflow-y-auto
            "
          >

            <div
              className="
                p-4
                border-b
                flex
                justify-between
              "
            >

              <h3
                className="
                  font-bold
                  text-primary
                "
              >
                Notifications
              </h3>

              <button
                onClick={
                  handleReadAll
                }
                className="
                  text-sm
                  text-secondary
                "
              >
                Read All
              </button>

            </div>

            {
              notifications.length === 0 ? (

                <div className="p-6">

                  No Notifications

                </div>

              ) : (

                notifications.map(
                  (
                    notification
                  ) => (

                    <div
                      key={
                        notification.id
                      }
                      onClick={() =>
                        handleRead(
                          notification.id
                        )
                      }
                      className={`
                        p-4
                        border-b
                        cursor-pointer

                        ${
                          !notification.isRead
                            ? "bg-green-50"
                            : ""
                        }
                      `}
                    >

                    <h4
                    className="
                        font-semibold
                    "
                    >
                    {
                        notification.notification?.title
                    }
                    </h4>

                    <p
                    className="
                        text-sm
                        text-gray-600
                    "
                    >
                    {
                        notification.notification?.message
                    }
                    </p>

                    </div>

                  )
                )

              )
            }

          </div>

        )
      }

    </div>

  );
}

export default NotificationDropdown;