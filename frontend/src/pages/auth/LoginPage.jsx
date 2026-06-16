import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "../../api/authApi";

import { loginSuccess } from "../../redux/slices/authSlice";

function LoginPage() {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const redirectByRole =
    (role) => {

      switch (role) {

        case "ADMIN":

        case "STUDENT":

        case "ORGANIZATION":

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );

          break;

        default:

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );
      }

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (loading) {

        return;
      }

      const emailValue =
        email.trim();

      const passwordValue =
        password.trim();

      if (!emailValue) {

        toast.error(
          "Please enter your email"
        );

        return;
      }

      if (!passwordValue) {

        toast.error(
          "Please enter your password"
        );

        return;
      }

      try {

        setLoading(true);

        const data =
          await loginUser({

            email:
              emailValue,

            password:
              passwordValue,

          });

        dispatch(

          loginSuccess({

            user:
              data.user,

            token:
              data.token,

          })

        );

        toast.success(
          "Login successful"
        );

        redirectByRole(

          data.user?.role?.roleName

        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(

          error?.response
            ?.data?.message ||

          "Invalid email or password"

        );

      } finally {

        setLoading(
          false
        );

      }

    };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-md
          p-10
        "
      >

        <div
          className="
            text-center
            mb-8
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              text-primary
            "
          >

            RUPP Platform

          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            Sign in to continue

          </p>

        </div>

        <form

          onSubmit={
            handleSubmit
          }

          className="
            space-y-5
          "

        >

          <div>

            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-gray-700
              "
            >

              Email

            </label>

            <input

              type="email"

              autoComplete="email"

              placeholder="Enter your email"

              value={email}

              onChange={(e) =>

                setEmail(
                  e.target.value
                )

              }

              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-secondary
              "

            />

          </div>

          <div>

            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-gray-700
              "
            >

              Password

            </label>

            <input

              type="password"

              autoComplete="current-password"

              placeholder="Enter your password"

              value={password}

              onChange={(e) =>

                setPassword(
                  e.target.value
                )

              }

              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-secondary
              "

            />

          </div>

          <button

            type="submit"

            disabled={loading}

            className="
              w-full
              bg-primary
              hover:bg-secondary
              text-white
              py-3
              rounded-xl
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "

          >

            {

              loading

              ? "Signing In..."

              : "Login"

            }

          </button>

        </form>

        <div
          className="
            mt-6
            text-center
            text-gray-600
          "
        >

          Don't have an account?

          <button

            onClick={() =>

              navigate(
                "/register"
              )

            }

            className="
              ml-2
              text-secondary
              font-semibold
            "

          >

            Register

          </button>

        </div>

      </div>

    </div>

  );

}

export default LoginPage;