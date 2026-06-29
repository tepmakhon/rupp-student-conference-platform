import { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

import { globalSearch } from "../../api/searchApi";

function NavbarSearch() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState({
    events: [],

    opportunities: [],

    organizations: [],
  });

  const [open, setOpen] = useState(false);

  const timeoutRef = useRef();

  const wrapperRef = useRef();

  /*
  ------------------------------------
  Close when click outside
  ------------------------------------
  */

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  /*
  ------------------------------------
  Debounce Search
  ------------------------------------
  */

  useEffect(() => {
    setSelectedIndex(-1);
    clearTimeout(timeoutRef.current);

    if (keyword.trim().length < 2) {
      setResults({
        events: [],
        opportunities: [],
        organizations: [],
      });

      setOpen(false);

      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await globalSearch(keyword);

        setResults(data);

        setOpen(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [keyword]);

  const total =
    results.events.length +
    results.opportunities.length +
    results.organizations.length;

  const allResults = [
    ...results.opportunities.map((item) => ({
      ...item,
      category: "opportunity",
    })),

    ...results.events.map((item) => ({
      ...item,
      category: "event",
    })),

    ...results.organizations.map((item) => ({
      ...item,
      category: "organization",
    })),
  ];

  const handleKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex((prev) => (prev < allResults.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allResults.length - 1));
    }

    if (e.key === "Escape") {
      setOpen(false);
    }

    if (e.key === "Enter") {
      const item = allResults[selectedIndex];

      if (!item) return;

      if (item.category === "event") {
        navigate(`/events/${item.id}`);
      }

      if (item.category === "opportunity") {
        navigate(`/opportunities/${item.id}`);
      }

      if (item.category === "organization") {
        navigate(`/organizations/${item.id}`);
      }

      setOpen(false);
    }
  };
  return (
    <div
      ref={wrapperRef}

      className="

        hidden

        lg:block

        relative

        w-full

        max-w-lg

      "
    >
      <div
        className="

          flex

          items-center

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
          value={keyword}
          onKeyDown={handleKeyDown}

          onChange={(e) => setKeyword(e.target.value)}

          placeholder="Search..."

          className="

            ml-3

            w-full

            bg-transparent

            outline-none

          "
        />
      </div>

      {open && (
        <div
          className="

              absolute

              top-full

              mt-2

              w-full

              bg-white

              rounded-2xl

              shadow-xl

              border

              overflow-hidden

              z-50

            "
        >
          {loading && (
            <div className="p-6 text-center">
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                                flex
                                items-center
                                gap-4
                            "
                  >
                    <div
                      className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-gray-200
                                    animate-pulse
                                "
                    />

                    <div className="flex-1">
                      <div
                        className="
                                        h-4
                                        w-40
                                        bg-gray-200
                                        rounded
                                        animate-pulse
                                    "
                      />

                      <div
                        className="
                                        h-3
                                        w-24
                                        mt-2
                                        bg-gray-100
                                        rounded
                                        animate-pulse
                                    "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && total === 0 && (
            <div className="p-6 text-center text-gray-500">
              <div className="p-10 text-center">
                <MagnifyingGlassIcon
                  className="
                              w-10
                              h-10
                              mx-auto
                              text-gray-300
                          "
                />

                <p className="mt-3 font-medium">No results found</p>

                <p className="text-sm text-gray-500">Try another keyword.</p>
              </div>
            </div>
          )}

          {!loading && total > 0 && (
            <>
              {/* Opportunities */}

              {results.opportunities.length > 0 && (
                <>
                  <div className="px-5 pt-4 text-xs font-bold text-gray-400 uppercase">
                    Opportunities
                  </div>

                  {results.opportunities.map((item, index) => (
                    <Link
                      key={item.id}
                      to={`/opportunities/${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3
                                    transition

                                    ${
                                      selectedIndex === index
                                        ? "bg-primary/10"
                                        : "hover:bg-gray-50"
                                    }
                                  `}
                    >
                      <img
                        src={item.logoUrl || "/images/default-logo.png"}
                        alt=""
                        className="
                                          w-11
                                          h-11
                                          rounded-xl
                                          object-cover
                                          border
                                      "
                      />

                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>

                        <p className="text-sm text-gray-500">
                          {item.organization?.organizationName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </>
              )}

              {/* Events */}

              {results.events.length > 0 && (
                <>
                  <div className="px-5 pt-4 text-xs font-bold text-gray-400 uppercase">
                    Events
                  </div>

                  {results.events.map((item, index) => (
                    <Link
                      key={item.id}
                      to={`/events/${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`
                                  flex
                                  items-center
                                  gap-4
                                  px-5
                                  py-3
                                  transition

                                  ${
                                    selectedIndex ===
                                    results.opportunities.length + index
                                      ? "bg-primary/10"
                                      : "hover:bg-gray-50"
                                  }
                                `}
                    >
                      <img
                        src={
                          item.bannerImageUrl || "/images/event-placeholder.jpg"
                        }
                        alt=""
                        className="
                                        w-11
                                        h-11
                                        rounded-xl
                                        object-cover
                                    "
                      />

                      <div>
                        <p className="font-semibold">{item.title}</p>

                        <p className="text-sm text-gray-500">
                          {item.organization?.organizationName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </>
              )}

              {/* Organizations */}

              {results.organizations.length > 0 && (
                <>
                  <div className="px-5 pt-4 text-xs font-bold text-gray-400 uppercase">
                    Organizations
                  </div>

                  {results.organizations.map((item, index) => (
                    <Link
                      key={item.id}
                      to={`/organizations/${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`
                                  flex
                                  items-center
                                  gap-4
                                  px-5
                                  py-3
                                  transition

                                  ${
                                    selectedIndex ===
                                    results.opportunities.length +
                                      results.events.length +
                                      index
                                      ? "bg-primary/10"
                                      : "hover:bg-gray-50"
                                  }
                                `}
                    >
                      <img
                        src={item.logoUrl || "/images/default-logo.png"}
                        alt=""
                        className="
                                        w-11
                                        h-11
                                        rounded-xl
                                        object-cover
                                        border
                                    "
                      />

                      <div>
                        <p className="font-semibold">{item.organizationName}</p>

                        <p className="text-sm text-gray-500">Organization</p>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NavbarSearch;
