import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);

  return {
    user: auth.user,

    role: auth.role,

    token: auth.token,

    isAuthenticated: !!auth.token,
  };
}
