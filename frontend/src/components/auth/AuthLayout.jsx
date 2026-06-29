function AuthLayout({ children }) {
  return (
    <div
      className="

        min-h-screen

        bg-gray-50

        flex

        items-center

        justify-center

        px-4

      "
    >
      <div
        className="

          w-full

          max-w-3xl

        "
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
