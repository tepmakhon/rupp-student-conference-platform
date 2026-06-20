import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function NavbarSearch() {
  return (
    <div
      className="
        hidden
        lg:flex
        items-center
        w-full
        max-w-lg
        bg-gray-100
        rounded-xl
        px-4
        py-3
      "
    >
      <MagnifyingGlassIcon
        className="
          w-5
          h-5
          text-gray-400
        "
      />

      <input
        type="text"
        placeholder="Search events, opportunities..."
        className="
          w-full
          ml-3
          bg-transparent
          outline-none
        "
      />
    </div>
  );
}

export default NavbarSearch;