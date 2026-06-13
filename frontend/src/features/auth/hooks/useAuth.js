import { useDispatch } from "react-redux";

import { Getme, Login } from "../services/auth.api";
import { Register } from "../services/auth.api";

import { setError, setLoading, setUser } from "../auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await Login({ email, password });
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleRegister({ name, email, password, role }) {
    try {
      dispatch(setLoading(true));
      const data = await Register({ name, email, password, role });
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "not registered"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleGetme() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // ← add this line

      dispatch(setLoading(true));
      const data = await Getme();
      dispatch(setUser(data.user));
      return data;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "not data"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    handleLogin,
    handleRegister,
    handleGetme,
  };
};
