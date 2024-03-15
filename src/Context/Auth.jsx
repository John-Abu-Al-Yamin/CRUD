import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = "https://back-end-crud.onrender.com";
  const [user, setUser] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  const RegisterUser = async (userdata) => {
    const res = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    });
    const data = await res.json();

    if (data.success) {
      setUser(data.token);
      localStorage.setItem("token", data.token);
      toast.success("User Register Successfully");
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };

  const LoginUser = async (userdata) => {
    const res = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    });
    const data = await res.json();

    if (!data.message) {
      setUser(data.token);
      localStorage.setItem("token", data.token);
      toast.success("User Logged in Successfully");
    }
    if (data.message) {
      toast.error(data.message);
    }
  };

  const LogoutUser = async () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("User Logged Out Successfully");
  };

  const contextData = {
    user,
    LoginUser,
    RegisterUser,
    LogoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
