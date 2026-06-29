import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "../../api/authApi";

import { loginSuccess } from "../../redux/slices/authSlice";

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        return toast.error("Email is required");
      }

      if (!password) {
        return toast.error("Password is required");
      }

      setLoading(true);

      const data = await loginUser({
        email: email.trim(),

        password,
      });

      dispatch(
        loginSuccess({
          user: data.user,

          token: data.token,
        }),
      );

      toast.success("Login successful");

      navigate(
        "/dashboard",

        {
          replace: true,
        },
      );
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Login failed");
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

      px-4

      "
    >
      <div
        className="

        w-full

        max-w-md

        bg-white

        rounded-3xl

        shadow-lg

        p-10

        "
      >
        <div className="text-center mb-8">
          <h1
            className="

            text-4xl

            font-bold

            text-primary

            "
          >
            RUPP Platform
          </h1>

          <p
            className="

            text-gray-500

            mt-3

            "
          >
            Welcome back
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

              font-medium

              "
            >
              Email
            </label>

            <input
              type="email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              placeholder="Enter email"

              className="

              w-full

              border

              rounded-xl

              px-4

              py-3

              "
            />
          </div>

          <div>
            <label
              className="

              block

              mb-2

              font-medium

              "
            >
              Password
            </label>

            <input
              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              placeholder="Enter password"

              className="

              w-full

              border

              rounded-xl

              px-4

              py-3

              "
            />
          </div>

          <button
            disabled={loading}

            className="

            w-full

            bg-primary

            hover:bg-secondary

            text-white

            py-3

            rounded-xl

            transition

            "
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div
          className="

          mt-8

          text-center

          "
        >
          Don't have an account?
          <button
            onClick={() => navigate("/register")}

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
