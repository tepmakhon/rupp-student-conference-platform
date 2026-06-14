import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { registerUser } from "../../api/authApi";

function RegisterPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const emailValue =
      email.trim();

    if (!emailValue) {

      toast.error(
        "Please enter your email"
      );

      return;
    }

    if (!password) {

      toast.error(
        "Please enter a password"
      );

      return;
    }

    if (password.length < 8) {

      toast.error(
        "Password must be at least 8 characters"
      );

      return;
    }

    if (
      password !== confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);

      await registerUser({
        email: emailValue,
        password,
      });

      toast.success(
        "Account created successfully"
      );

      navigate("/login");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Unable to create account"
      );

    } finally {

      setLoading(false);

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
      "
    >

      <div
        className="
          bg-white
          shadow-md
          rounded-2xl
          p-10
          w-full
          max-w-md
        "
      >

        <div className="text-center mb-8">

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
            Create your account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
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
              placeholder="Enter password"
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
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
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
                ? "Creating Account..."
                : "Register"
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

          Already have an account?

          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              ml-2
              text-secondary
              font-semibold
            "
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;