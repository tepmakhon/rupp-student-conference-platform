function ErrorState({
  message = "Something went wrong.",

  action,
  onRetry,
}) {
  return (
    <div role="alert"
      className="

        bg-red-50

        border

        border-red-200

        rounded-2xl

        p-8

        text-center

      "
    >
      <h2
        className="

          text-2xl

          font-bold

          text-red-600

          mb-3

        "
      >
        Error
      </h2>

      <p
        className="

          text-gray-600

          mb-6

        "
      >
        {message}
      </p>

      {action}
      {onRetry && <button type="button" onClick={onRetry} className="bg-primary text-white px-6 py-3 rounded-xl">Try again</button>}
    </div>
  );
}

export default ErrorState;
