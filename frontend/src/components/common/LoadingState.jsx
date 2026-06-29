function LoadingState({ message = "Loading..." }) {
  return (
    <div
      className="

        flex

        flex-col

        items-center

        justify-center

        py-20

      "
    >
      <div
        className="

          w-12

          h-12

          border-4

          border-gray-200

          border-t-primary

          rounded-full

          animate-spin

          mb-4

        "
      />

      <p
        className="

          text-gray-500

        "
      >
        {message}
      </p>
    </div>
  );
}

export default LoadingState;
