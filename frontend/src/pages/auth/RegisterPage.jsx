import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import toast from "react-hot-toast";

function RegisterPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleRegister =
    async () => {

      if (!email) {
        alert("Email is required");
        return;
      }

      if (!password) {
        alert("Password is required");
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

        const response =
          await registerUser({
            email,
            password,
          });

        console.log(
          "REGISTER RESPONSE:",
          response
        );

        toast.success(
          "Registration successful"
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message ||
          "Registration failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[450px]">

        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Register
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
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded-lg"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <p className="text-center mt-4">

          Already have an account?

          <span
            onClick={() =>
              navigate("/login")
            }
            className="text-primary ml-2 cursor-pointer font-semibold"
          >
            Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default RegisterPage;