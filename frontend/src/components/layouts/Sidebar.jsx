import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import {

  HomeIcon,

  CalendarDaysIcon,

  BriefcaseIcon,

  BookmarkIcon,

  PlusCircleIcon,

  UserCircleIcon,

  ClipboardDocumentCheckIcon,

} from "@heroicons/react/24/outline";

function Sidebar({

  sidebarOpen,

  setSidebarOpen,

}) {

  const location =
    useLocation();

  const role =
    useSelector(

      (state) =>

        state.auth.role

    );

  const allMenus = [

    {
      name: "Dashboard",

      path: "/dashboard",

      icon: HomeIcon,

      roles: [

        "ADMIN",

        "STUDENT",

        "ORGANIZATION",

      ],
    },

    {
      name: "Events",

      path: "/events",

      icon: CalendarDaysIcon,

      roles: [

        "ADMIN",

        "STUDENT",

        "ORGANIZATION",

      ],
    },

    {
      name: "Opportunities",

      path: "/opportunities",

      icon: BriefcaseIcon,

      roles: [

        "ADMIN",

        "STUDENT",

        "ORGANIZATION",

      ],
    },

    /*
    |--------------------------------------------------------------------------
    | Student
    |--------------------------------------------------------------------------
    */

    {
      name:

        "Saved Opportunities",

      path:

        "/saved-opportunities",

      icon:

        BookmarkIcon,

      roles: [

        "STUDENT",

      ],
    },

    {
      name:

        "My Applications",

      path:

        "/my-applications",

      icon:

        BriefcaseIcon,

      roles: [

        "STUDENT",

      ],
    },

    /*
    |--------------------------------------------------------------------------
    | Organization
    |--------------------------------------------------------------------------
    */

    {

      name:

        "My Events",

      path:

        "/organization/events",

      icon:

        CalendarDaysIcon,

      roles: [

        "ORGANIZATION",

      ],

    },

    {
      name:

        "My Opportunities",

      path:

        "/organization/opportunities",

      icon:

        BriefcaseIcon,

      roles: [

        "ORGANIZATION",

      ],
    },

    /*
    |--------------------------------------------------------------------------
    | Admin
    |--------------------------------------------------------------------------
    */

    {
      name:

        "Pending Events",

      path:

        "/admin/events/pending",

      icon:

        ClipboardDocumentCheckIcon,

      roles: [

        "ADMIN",

      ],
    },

    {
      name:

        "Pending Opportunities",

      path:

        "/admin/opportunities/pending",

      icon:

        ClipboardDocumentCheckIcon,

      roles: [

        "ADMIN",

      ],
    },

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    {
      name:

        "Profile",

      path:

        "/profile",

      icon:

        UserCircleIcon,

      roles: [

        "ADMIN",

        "STUDENT",

        "ORGANIZATION",

      ],
    },

  ];

  const menuItems =

    allMenus.filter(

      (menu) =>

        menu.roles.includes(
          role
        )

    );

  const isActiveRoute =

    (path) => {

      return (

        location.pathname ===
        path

        ||

        location.pathname.startsWith(

          `${path}/`

        )

      );

    };

  const handleCloseSidebar =

    () => {

      if (

        window.innerWidth < 768

      ) {

        setSidebarOpen(
          false
        );

      }

    };

  return (

    <>

      {

        sidebarOpen && (

          <div

            className="

              fixed

              inset-0

              z-40

              bg-black/50

              md:hidden

            "

            onClick={() =>

              setSidebarOpen(
                false
              )

            }

          />

        )

      }

      <aside

        className={`

          fixed

          top-0

          left-0

          z-50

          h-screen

          w-64

          overflow-y-auto

          bg-primary

          text-white

          p-6

          transform

          transition-transform

          duration-300

          ${

            sidebarOpen

            ? "translate-x-0"

            : "-translate-x-full"

          }

          md:translate-x-0

        `}

      >

        {/* Logo */}

        <div className="mb-10">

          <h1

            className="

              text-2xl

              font-bold

              text-gold

            "

          >

            RUPP Platform

          </h1>

          <p

            className="

              text-sm

              text-gray-300

              mt-1

            "

          >

            Student Conference

            & Opportunity Platform

          </p>

        </div>

        {/* Navigation */}

        <nav

          className="

            flex

            flex-col

            gap-2

          "

        >

          {

            menuItems.map(

              (item) => {

                const Icon =
                  item.icon;

                return (

                  <Link

                    key={
                      item.path
                    }

                    to={
                      item.path
                    }

                    onClick={
                      handleCloseSidebar
                    }

                    className={`

                      flex

                      items-center

                      gap-3

                      p-3

                      rounded-xl

                      transition-all

                      duration-200

                      ${

                        isActiveRoute(

                          item.path

                        )

                        ?

                        `

                        bg-secondary

                        shadow-md

                        `

                        :

                        `

                        hover:bg-secondary/70

                        `

                      }

                    `}

                  >

                    <Icon

                      className="

                        w-6

                        h-6

                      "

                    />

                    <span>

                      {

                        item.name

                      }

                    </span>

                  </Link>

                );

              }

            )

          }

        </nav>

      </aside>

    </>

  );

}

export default Sidebar;