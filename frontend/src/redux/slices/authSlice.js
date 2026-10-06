import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem("token");

let user = null;

try {
  const storedUser = localStorage.getItem("user");

  user = storedUser ? JSON.parse(storedUser, (key, value) =>
    ["passwordHash", "password", "refreshToken"].includes(key) ? undefined : value) : null;
  if (user) localStorage.setItem("user", JSON.stringify(user));
} catch {
  console.error("Invalid user data in localStorage");

  localStorage.removeItem("user");
}

if (!token || !user?.id || !["STUDENT", "ORGANIZATION", "ADMIN"].includes(user?.role?.roleName)) {
  token = null;
  user = null;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
}

const initialState = {
  user,

  token,

  role: user?.role?.roleName || null,

  isAuthenticated: !!token && !!user,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;

      state.token = token;

      state.role = user?.role?.roleName || null;

      state.isAuthenticated = true;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      localStorage.setItem("role", user?.role?.roleName || "");
    },

    logout: (state) => {
      state.user = null;

      state.token = null;

      state.role = null;

      state.isAuthenticated = false;

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      localStorage.removeItem("role");
    },
  },
});

export const {
  loginSuccess,

  logout,
} = authSlice.actions;

export default authSlice.reducer;
