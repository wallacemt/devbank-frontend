import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { UserResponse } from "@/types/userTypes";
import { useUser } from "@/hooks/useUser";

export const UserContext = createContext({
  user: null as UserResponse | null,
  login: (_token: string) => {},
  logout: () => {},
  view: false,
  handleView: () => {},
  loading: true,
  update: false,
  handleUpdate: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const { getUserInfo } = useUser();

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [update]);

  const fetchUserData = async () => {
    try {
      const userData = await getUserInfo();
      setUser(userData!);
    } catch (error: any) {
      if (error.response.status === 401) {
        logout();
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  };

  const login = async (token: string) => {
    Cookies.set("jwtToken", token, { expires: 1, sameSite: "strict" });
    fetchUserData();
    navigate("/");
  };

  const logout = () => {
    Cookies.remove("jwtToken");
    setUser(null);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleUpdate = () => setUpdate(!update);
  const handleView = () => setView(!view);
  return (
    <UserContext.Provider value={{ user, login, logout, loading, update, handleUpdate, view, handleView }}>
      {children}
    </UserContext.Provider>
  );
};
