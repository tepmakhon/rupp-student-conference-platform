import {

  useEffect,

  useRef,

  useState,

} from "react";

import toast
from "react-hot-toast";

import {

  BellIcon,

  CheckCircleIcon,

} from "@heroicons/react/24/outline";

import {

  getNotifications,

  readNotification,

  readAllNotifications,

} from "../../api/notificationApi";

import {

  formatDate,

} from "../../utils/formatDate";

function NotificationDropdown() {

  const [

    notifications,

    setNotifications,

  ] = useState([]);

  const [

    open,

    setOpen,

  ] = useState(false);

  const [

    loading,

    setLoading,

  ] = useState(false);

  const dropdownRef =

    useRef(null);

  useEffect(() => {

    loadNotifications();

  }, []);

  useEffect(() => {

    const handleClickOutside =

      (event) => {

        if (

          dropdownRef.current &&

          !dropdownRef.current.contains(

            event.target

          )

        ) {

          setOpen(

            false

          );

        }

      };

    document.addEventListener(

      "mousedown",

      handleClickOutside

    );

    return () =>

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

  }, []);

  const loadNotifications =

    async () => {

      try {

        setLoading(

          true

        );

        const data =

          await getNotifications();

        setNotifications(

          Array.isArray(

            data

          )

          ?

          data

          :

          []

        );

      }

      catch (error) {

        console.error(

          error

        );

        toast.error(

          "Failed to load notifications"

        );

      }

      finally {

        setLoading(

          false

        );

      }

    };

  const unreadCount =

    notifications.filter(

      (notification) =>

        !notification.isRead

    ).length;

  const handleRead =

    async (id) => {

      try {

        await readNotification(

          id

        );

        setNotifications(

          (previous) =>

            previous.map(

              (

                notification

              ) =>

                notification.id === id

                ?

                {

                  ...notification,

                  isRead: true,

                }

                :

                notification

            )

        );

      }

      catch (error) {

        console.error(

          error

        );

      }

    };

  const handleReadAll =

    async () => {

      try {

        await readAllNotifications();

        setNotifications(

          (previous) =>

            previous.map(

              (

                notification

              ) => ({

                ...notification,

                isRead: true,

              })

            )

        );

        toast.success(

          "All notifications marked as read"

        );

      }

      catch (error) {

        console.error(

          error

        );

      }

    };

  return (

    <div

      ref={

        dropdownRef

      }

      className="

        relative

      "

    >

      {/* Bell */}

      <button

        onClick={() =>

          setOpen(

            !open

          )

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

              {

                unreadCount > 99

                ?

                "99+"

                :

                unreadCount

              }

            </span>

          )

        }

      </button>

      {/* Dropdown */}

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

              border

              z-50

              max-h-[500px]

              overflow-y-auto

            "

          >

            {/* Header */}

            <div

              className="

                p-4

                border-b

                flex

                items-center

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

              {

                notifications.length >

                0 && (

                  <button

                    onClick={

                      handleReadAll

                    }

                    className="

                      text-sm

                      text-secondary

                      font-medium

                    "

                  >

                    Read All

                  </button>

                )

              }

            </div>

            {/* Loading */}

            {

              loading && (

                <div

                  className="

                    p-6

                    text-center

                    text-gray-500

                  "

                >

                  Loading...

                </div>

              )

            }

            {/* Empty */}

            {

              !loading &&

              notifications.length === 0 && (

                <div

                  className="

                    p-8

                    text-center

                    text-gray-500

                  "

                >

                  No notifications

                </div>

              )

            }

            {/* Notifications */}

            {

              !loading &&

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

                      hover:bg-gray-50

                      transition

                      ${

                        !notification.isRead

                        ?

                        "bg-green-50"

                        :

                        ""

                      }

                    `}

                  >

                    <div

                      className="

                        flex

                        justify-between

                        items-start

                        gap-3

                      "

                    >

                      <div>

                        <h4

                          className="

                            font-semibold

                            text-gray-800

                          "

                        >

                          {

                            notification

                            .notification

                            ?.title

                          }

                        </h4>

                        <p

                          className="

                            text-sm

                            text-gray-600

                            mt-1

                          "

                        >

                          {

                            notification

                            .notification

                            ?.message

                          }

                        </p>

                        {

                          notification

                          .createdAt && (

                            <p

                              className="

                                text-xs

                                text-gray-400

                                mt-2

                              "

                            >

                              {

                                formatDate(

                                  notification.createdAt

                                )

                              }

                            </p>

                          )

                        }

                      </div>

                      {

                        !notification.isRead && (

                          <CheckCircleIcon

                            className="

                              w-5

                              h-5

                              text-green-600

                            "

                          />

                        )

                      }

                    </div>

                  </div>

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