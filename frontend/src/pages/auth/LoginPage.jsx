import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../../redux/slices/authSlice";

import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";

function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {

      setLoading(true);

      const data =
        await loginUser({
          email,
          password,
        });

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        })
      );

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Invalid credentials"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[450px]">

        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary transition"
        >
          {
            loading
              ? "Signing In..."
              : "Login"
          }
        </button>

        <p className="text-center mt-4">

          Don't have an account?

          <span
            onClick={() =>
              navigate("/register")
            }
            className="text-primary ml-2 cursor-pointer font-semibold"
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
}

export default LoginPage;