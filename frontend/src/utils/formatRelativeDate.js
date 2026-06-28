export function formatRelativeDate(date) {

  if (!date) {

    return "-";

  }

  const now =
    new Date();

  const target =
    new Date(date);

  const seconds =
    Math.floor(
      (now - target) / 1000
    );

  if (seconds < 60) {

    return "Just now";

  }

  const minutes =
    Math.floor(seconds / 60);

  if (minutes < 60) {

    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  }

  const hours =
    Math.floor(minutes / 60);

  if (hours < 24) {

    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  }

  const days =
    Math.floor(hours / 24);

  if (days === 1) {

    return "Yesterday";

  }

  if (days < 7) {

    return `${days} days ago`;

  }

  return target.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

}

export function formatFullDate(date) {

  if (!date) {

    return "-";

  }

  return new Date(date)
    .toLocaleString(
      "en-US",
      {

        year: "numeric",

        month: "long",

        day: "numeric",

        hour: "numeric",

        minute: "2-digit",

      }
    );

}