import {

  useEffect,

  useRef,

  useState,

} from "react";

import {

  Link,

} from "react-router-dom";

import toast

from "react-hot-toast";

import {

  useDispatch,

  useSelector,

} from "react-redux";

import {

  BellIcon,

  ArrowRightIcon,

} from "@heroicons/react/24/outline";

import {

  getNotifications,

  readNotification,

  readAllNotifications,

} from "../../api/notificationApi";

import {

  setNotifications,

  setNotificationLoading,

  setNotificationError,

  markAsRead,

  markAllAsRead,

} from "../../redux/slices/notificationSlice";

import {

  formatDate,

} from "../../utils/formatDate";

function NotificationDropdown() {

  const dispatch =

    useDispatch();

  const dropdownRef =

    useRef(null);

  const [

    open,

    setOpen,

  ] = useState(

    false

  );

  const {

    notifications,

    unreadCount,

    loading,

  } = useSelector(

    state =>

    state.notification

  );

  useEffect(() => {

    loadNotifications();

    const interval = setInterval(() => {

      loadNotifications();

    }, 30000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    const handleClickOutside =

      event => {

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

      dispatch(

        setNotificationLoading(

          true

        )

      );

      dispatch(

        setNotificationError(

          null

        )

      );

      const data =

        await getNotifications(

          1,

          5

        );

      dispatch(

        setNotifications(

          data

        )

      );

    }

    catch (

      error

    ) {

      console.error(

        error

      );

      toast.error(

        "Failed to load notifications"

      );

    }

    finally {

      dispatch(

        setNotificationLoading(

          false

        )

      );

    }

  };

  const handleRead =

  async id => {

    try {

      await readNotification(

        id

      );

      dispatch(

        markAsRead(

          id

        )

      );

    }

    catch (

      error

    ) {

      console.error(

        error

      );

    }

  };

  const handleReadAll =

  async () => {

    try {

      await readAllNotifications();

      dispatch(

        markAllAsRead()

      );

      toast.success(

        "All notifications marked as read"

      );

    }

    catch (

      error

    ) {

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

      {

        open && (

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

                  {

                    unreadCount

                  }

                  {" "}

                  unread

                </p>

              </div>

              {

                unreadCount > 0 && (

                  <button

                    onClick={

                      handleReadAll

                    }

                    className="

                      text-secondary

                      font-semibold

                      text-sm

                    "

                  >

                    Read All

                  </button>

                )

              }

            </div>

            {/* Body */}

            <div

              className="

                max-h-96

                overflow-y-auto

              "

            >

              {

                loading && (

                  <div

                    className="

                      p-10

                      text-center

                      text-gray-500

                    "

                  >

                    <div className="p-8 space-y-3">

                      {[1,2,3].map(item => (

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

                )

              }

              {

                !loading &&

                notifications.length === 0 && (

                  <div className="

                  p-10

                  text-center

                  ">

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

                )

              }

              {

                !loading &&

                notifications.map(

                  notification => (

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

                        p-5

                        border-b

                        cursor-pointer

                        transition

                        hover:bg-gray-50

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

                          gap-4

                        "

                      >

                        {

                          !notification.isRead && (

                            <div

                              className="

                                w-3

                                h-3

                                rounded-full

                                bg-green-500

                                mt-2

                                flex-shrink-0

                              "

                            />

                          )

                        }

                        <div

                          className="

                            flex-1

                          "

                        >

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

                          <p

                            className="

                              text-xs

                              text-gray-400

                              mt-2

                            "

                          >

                            {

                              formatDate(

                                notification

                                .notification

                                ?.createdAt

                              )

                            }

                          </p>

                        </div>

                      </div>

                    </div>

                  )

                )

              }

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

                onClick={() =>

                  setOpen(

                    false

                  )

                }

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

        )

      }

    </div>

  );

}

export default NotificationDropdown;