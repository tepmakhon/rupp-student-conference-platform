import {

  useEffect,

  useMemo,

  useState,

} from "react";

import {

  useDispatch,

  useSelector,

} from "react-redux";

import DashboardLayout

from "../../components/layouts/DashboardLayout";

import DashboardLoading

from "../../components/dashboard/DashboardLoading";

import DashboardError

from "../../components/dashboard/DashboardError";

import NotificationHero
from "../../components/notifications/NotificationHero";

import NotificationStats
from "../../components/notifications/NotificationStats";

import NotificationFilters

from "../../components/notifications/NotificationFilters";

import NotificationList

from "../../components/notifications/NotificationList";

import NotificationPagination

from "../../components/notifications/NotificationPagination";

import NotificationEmpty

from "../../components/notifications/NotificationEmpty";

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

function NotificationPage() {

  const dispatch =

    useDispatch();

  const {

    notifications,

    unreadCount,

    loading,

    error,

    pagination,

  } = useSelector(

    state =>

    state.notification

  );

  const [

    search,

    setSearch,

  ] = useState("");

  const [

    filter,

    setFilter,

  ] = useState(

    "ALL"

  );

  const [

    page,

    setPage,

  ] = useState(

    1

  );

  useEffect(() => {

    loadNotifications(

      page

    );

  }, [page]);

  const loadNotifications =

  async (

    currentPage = 1

  ) => {

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

        currentPage,

        10

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

      dispatch(

        setNotificationError(

          "Failed to load notifications"

        )

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

  const filteredNotifications =

    useMemo(

      () => {

        let items =

          notifications;

        if (

          filter ===

          "UNREAD"

        ) {

          items =

            items.filter(

              item =>

              !item.isRead

            );

        }

        if (

          filter ===

          "READ"

        ) {

          items =

            items.filter(

              item =>

              item.isRead

            );

        }

        if (

          search

        ) {

          const keyword =

            search.toLowerCase();

          items =

            items.filter(

              item =>

              item.notification

              ?.title

              ?.toLowerCase()

              .includes(

                keyword

              )

              ||

              item.notification

              ?.message

              ?.toLowerCase()

              .includes(

                keyword

              )

            );

        }

        return items;

      },

      [

        notifications,

        search,

        filter,

      ]

    );

  const handleRead =

  async (

    id

  ) => {

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

    <DashboardLayout>

      <div

        className="

          max-w-7xl

          mx-auto

          space-y-8

        "

      >

        <NotificationHero

          total={notifications.length}

          unread={unreadCount}

        />

        <NotificationStats

          notifications={

            notifications

          }

        />

        <NotificationFilters

          search={

            search

          }

          setSearch={

            setSearch

          }

          filter={

            filter

          }

          setFilter={

            setFilter

          }

        />

        {

          loading && (

            <DashboardLoading

              text="Loading notifications..."

            />

          )

        }

        {

          !loading &&

          error && (

            <DashboardError

              message={

                error

              }

            />

          )

        }

        {

          !loading &&

          !error &&

          filteredNotifications

          .length === 0 && (

            <NotificationEmpty />

          )

        }

        {

          !loading &&

          !error &&

          filteredNotifications

          .length > 0 && (

            <NotificationList

              notifications={

                filteredNotifications

              }

              onRead={

                handleRead

              }

            />

          )

        }

        {

          pagination && (

            <NotificationPagination

              pagination={

                pagination

              }

              onPageChange={

                setPage

              }

            />

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default NotificationPage;