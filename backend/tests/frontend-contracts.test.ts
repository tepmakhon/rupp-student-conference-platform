import { beforeEach, describe, expect, it, vi } from "vitest";
const browser = vi.hoisted(() => {
  const values = new Map<string, string>();
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, String(value)), removeItem: (key: string) => values.delete(key) };
  vi.stubGlobal("localStorage", storage);
  vi.stubGlobal("window", new EventTarget());
  return { values, storage };
});
import axios from "../../frontend/node_modules/axios/index.js";
import client from "../../frontend/src/api/axios.js";
import { getOpportunities } from "../../frontend/src/api/opportunityApi.js";
import { getApiErrorMessage } from "../../frontend/src/utils/apiError.js";
import { store } from "../../frontend/src/redux/store.js";
import { loginSuccess, logout } from "../../frontend/src/redux/slices/authSlice.js";
import { setDashboardStats } from "../../frontend/src/redux/slices/dashboardSlice.js";

beforeEach(() => { browser.values.clear(); store.dispatch(logout()); });
describe("frontend API contracts and session isolation", () => {
  it("attaches the current token to requests", async () => {
    browser.storage.setItem("token", "current-session");
    client.defaults.adapter = async (config) => {
      expect(config.headers.Authorization).toBe("Bearer current-session");
      return { data: {}, status: 200, statusText: "OK", headers: {}, config };
    };
    await client.get("/profile/me");
  });
  it("announces expiry for a failed authenticated request", async () => {
    browser.storage.setItem("token", "current-session");
    const expired = vi.fn(); window.addEventListener("auth:expired", expired);
    client.defaults.adapter = async (config) => {
      throw new axios.AxiosError("Unauthorized", "ERR_BAD_REQUEST", config, null, { status: 401, data: {}, headers: {}, config, statusText: "Unauthorized" });
    };
    await expect(client.get("/profile/me")).rejects.toThrow();
    expect(expired).toHaveBeenCalledTimes(1);
    window.removeEventListener("auth:expired", expired);
  });
  it("does not expire a new session because an older request failed", async () => {
    browser.storage.setItem("token", "old-session");
    const expired = vi.fn(); window.addEventListener("auth:expired", expired);
    client.defaults.adapter = async (config) => {
      browser.storage.setItem("token", "new-session");
      throw new axios.AxiosError("Unauthorized", "ERR_BAD_REQUEST", config, null, { status: 401, data: {}, headers: {}, config, statusText: "Unauthorized" });
    };
    await expect(client.get("/profile/me")).rejects.toThrow();
    expect(expired).not.toHaveBeenCalled();
    window.removeEventListener("auth:expired", expired);
  });
  it("encodes opportunity keywords instead of treating them as query parameters", async () => {
    client.defaults.adapter = async (config) => {
      const uri = client.getUri(config);
      const params = new URL(uri).searchParams;
      expect(params.get("keyword")).toBe("R&D + scholarships");
      expect(params.get("typeId")).toBe("2");
      return { data: { data: { opportunities: [] } }, status: 200, statusText: "OK", headers: {}, config };
    };
    await expect(getOpportunities(1, 10, "R&D + scholarships", "2")).resolves.toEqual({ opportunities: [] });
  });
  it("clears cached role-specific data and storage on logout", () => {
    store.dispatch(loginSuccess({ token: "session", user: { id: "1", role: { roleName: "STUDENT" } } }));
    store.dispatch(setDashboardStats({ privateStudentData: true }));
    store.dispatch(logout());
    expect(store.getState().auth.isAuthenticated).toBe(false);
    expect(store.getState().dashboard.stats).not.toEqual({ privateStudentData: true });
    expect(browser.storage.getItem("token")).toBeNull();
    expect(browser.storage.getItem("user")).toBeNull();
  });
  it("distinguishes network, forbidden and missing-resource failures", () => {
    expect(getApiErrorMessage(new Error())).toMatch(/connection/);
    expect(getApiErrorMessage({ response: { status: 403 } })).toMatch(/permission/);
    expect(getApiErrorMessage({ response: { status: 404 } })).toMatch(/not found/);
  });
});


it("discards private responses from a previous session", async () => {
  browser.storage.setItem("token", "old-session");
  client.defaults.adapter = async (config) => {
    browser.storage.setItem("token", "new-session");
    return { data: { privateUser: "old-user" }, status: 200, statusText: "OK", headers: {}, config };
  };
  await expect(client.get("/profile/me")).rejects.toThrow("Session changed");
});
