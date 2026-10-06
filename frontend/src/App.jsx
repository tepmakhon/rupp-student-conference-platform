import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./socket/socket";
import { logout } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const expire = () => dispatch(logout());
    const syncLogout = (event) => {
      if (event.key === "token" && !event.newValue) expire();
    };
    window.addEventListener("auth:expired", expire);
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("auth:expired", expire);
      window.removeEventListener("storage", syncLogout);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;
    socket.auth = { token };
    socket.connect();
    return () => socket.disconnect();
  }, [token]);
  return <AppRoutes />;
}

export default App;
