import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "./socket/socket";

function App() {
  useEffect(() => {

    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {

      Notification.requestPermission();

    }

  }, []);
  const user = useSelector(
    state => state.auth.user
  );

  useEffect(() => {

    if (!user?.id) return;

    socket.connect();

    socket.emit("join", {
      userId: String(user.id),
      role: user.role,
    });

    return () => {

      socket.disconnect();

    };

  }, [user]);
  return <AppRoutes />;
}

export default App;