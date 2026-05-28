import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../../redux/slices/authSlice";

import { loginUser } from "../../api/authApi";

function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const data = await loginUser({
        email,
        password,
      });

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        })
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary transition"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default LoginPage;