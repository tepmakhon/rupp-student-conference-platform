import NotificationCard from "./NotificationCard";

import NotificationEmpty from "./NotificationEmpty";

function NotificationList({
  notifications = [],

  onRead,
}) {
  if (notifications.length === 0) {
    return <NotificationEmpty />;
  }

  return (
    <div
      className="

        space-y-5

      "
    >
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}

          notification={notification}

          onRead={onRead}
        />
      ))}
    </div>
  );
}

export default NotificationList;
