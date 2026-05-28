import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../../redux/slices/authSlice";

function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {

    const fakeUser = {
      id: 1,
      name: "MakHon",
      role: "student",
    };

    const fakeToken = "jwt-token-example";

    dispatch(
      loginSuccess({
        user: fakeUser,
        token: fakeToken,
      })
    );

    navigate("/dashboard");
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
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
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