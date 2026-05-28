function Navbar() {
  return (
    <div className="h-16 bg-white shadow-md flex items-center justify-between px-8">

      <h2 className="text-2xl font-semibold text-primary">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-secondary"></div>

      </div>
    </div>
  );
}

export default Navbar;