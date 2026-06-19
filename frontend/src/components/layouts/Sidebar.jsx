import {

  Link,

  useLocation,

} from "react-router-dom";

import {

  useSelector,

} from "react-redux";

import sidebarMenu

from "../../constants/sidebarMenu";

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

  const menuItems =

    sidebarMenu.filter(

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

            ?

            "translate-x-0"

            :

            "-translate-x-full"

          }

          md:translate-x-0

        `}

      >

        <div

          className="mb-10"

        >

          <h1

            className="

              text-2xl

              font-bold

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

                      transition

                      ${

                        isActiveRoute(

                          item.path

                        )

                        ?

                        "bg-secondary shadow-md"

                        :

                        "hover:bg-secondary/70"

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