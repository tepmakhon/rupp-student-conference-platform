function EventRegisterButton({
  registering,

  onRegister,
}) {
  return (
    <button
      onClick={onRegister}

      disabled={registering}

      className="

        w-full

        md:w-auto

        px-10

        py-4

        bg-primary

        hover:bg-secondary

        text-white

        rounded-2xl

        font-semibold

        transition

      "
    >
      {registering ? "Registering..." : "Register Event"}
    </button>
  );
}

export default EventRegisterButton;
