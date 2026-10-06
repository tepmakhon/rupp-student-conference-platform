import useApiQuery from "../../hooks/useApiQuery";
import ErrorState from "../common/ErrorState";
import { useEffect, useRef, useState , useCallback } from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import { useDispatch } from "react-redux";

import { BellIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from "../../api/notificationApi";

import { markAsRead, markAllAsRead } from "../../redux/slices/notificationSlice";

import NotificationCard from "./NotificationCard";

import socket from "../../socket/socket";
import { playNotificationSound } from "../../utils/playNotificationSound";

function NotificationDropdown() {
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const loader = useCallback(() => getNotifications(1, 5), []);
  const { data, loading, error, retry: loadNotifications } = useApiQuery(loader);
  const notifications = data?.userNotifications || [];
  const unreadCount = data?.unreadCount || 0;

  const handleNotification = useCallback(async (notification) => {
    playNotificationSound();

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(
        notification.notification?.title || "New Notification",

        {
          body: notification.notification?.message || "",

          icon: "/logo.png",
        },
      );
    }

    toast.success(notification.notification?.title || "New Notification");
    await loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    socket.on("new_notification", handleNotification);

    return () => {
      socket.off("new_notification", handleNotification);
    };
  }, [handleNotification]);
  useEffect(() => {
    const interval = setInterval(() => {
      loadNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",

      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        "mousedown",

        handleClickOutside,
      );
  }, []);




  const handleRead = async (id) => {
    try {
      await readNotification(id);

      dispatch(markAsRead(id));
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadAll = async () => {
    try {
      await readAllNotifications();

      dispatch(markAllAsRead());
      loadNotifications();

      toast.success("All notifications marked as read");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={dropdownRef}

      className="

        relative

      "
    >
      {/* Bell */}

      <button
        onClick={() => {
          if (!open) {
            loadNotifications();
          }

          setOpen(!open);
        }}

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

        {unreadCount > 0 && (
          <span
            className="

                absolute

                -top-1

                -right-1

                min-w-5

                h-5

                px-1

                flex

                items-center

                justify-center

                bg-red-500

                text-white

                text-xs

                rounded-full

              "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="

              absolute

              right-0

              sm:right-0

              max-sm:right-[-10px]

              mt-3

              w-[340px]

              sm:w-[380px]

              max-w-[calc(100vw-20px)]

              bg-white

              rounded-3xl

              shadow-xl

              border

              overflow-hidden

              z-50

            "
        >
          {/* Header */}

          <div
            className="

                p-5

                border-b

                flex

                justify-between

                items-center

              "
          >
            <div>
              <h3
                className="

                    text-lg

                    font-bold

                    text-primary

                  "
              >
                Notifications
              </h3>

              <p
                className="

                    text-sm

                    text-gray-500

                  "
              >
                {unreadCount} unread
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleReadAll}

                className="

                      text-secondary

                      font-semibold

                      text-sm

                    "
              >
                Read All
              </button>
            )}
          </div>

          {/* Body */}

          <div
            className="

                max-h-96

                overflow-y-auto

              "
          >
            {loading && (
              <div
                className="

                      p-10

                      text-center

                      text-gray-500

                    "
              >
                <div className="p-8 space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}

                      className="

                            h-16

                            rounded-xl

                            bg-gray-100

                            animate-pulse

                          "
                    />
                  ))}
                </div>
              </div>
            )}

            {error && <ErrorState message={error} onRetry={loadNotifications} />}

            {!loading && !error && notifications.length === 0 && (
              <div
                className="

                  p-10

                  text-center

                  "
              >
                <BellIcon
                  className="

                        w-12

                        h-12

                        mx-auto

                        text-gray-300

                      "
                />

                <p
                  className="

                        mt-3

                        text-gray-500

                      "
                >
                  No notifications yet
                </p>
              </div>
            )}

            {!loading && !error &&
              notifications.map((notification) => (
                <div key={notification.id} className="border-b last:border-b-0">
                  <NotificationCard
                    notification={notification}
                    onRead={handleRead}
                  />
                </div>
              ))}
          </div>

          {/* Footer */}

          <div
            className="

                p-4

                border-t

              "
          >
            <Link
              to="/notifications"

              onClick={() => setOpen(false)}

              className="

                  flex

                  items-center

                  justify-center

                  gap-2

                  text-primary

                  font-semibold

                  hover:text-secondary

                "
            >
              View All Notifications
              <ArrowRightIcon
                className="

                    w-4

                    h-4

                  "
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
