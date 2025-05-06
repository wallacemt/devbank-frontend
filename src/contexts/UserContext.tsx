import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { getUser } from "@/api/userApi";
//import { UserResponse } from "@/types/userTypes";

export const UserContext = createContext({
  user: "" as string | null,
  login: (_token: string) => {},
  logout: () => {},
  loading: true,
  viewPreferenceModal: true,
  setViewPreferenceModal: "" as any,
  update: false,
  handleUpdate: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [viewPreferenceModal, setViewPreferenceModal] = useState(
    sessionStorage.getItem("viewPreferenceModal") !== "true" ? false : true || true
  );

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      return;
      //fetchUserData();
    } else {
      setLoading(false);
    }
  }, [update]);

  // const fetchUserData = async () => {
  //   try {
  //     const userData: any = await getUser();
  //     setUser(userData);
  //   } catch (error: any) {
  //     if (error.status == 401) {
  //       logout();
  //     }
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  //};

  const login = async (token: string) => {
    Cookies.set("jwtToken", token, { expires: 1, sameSite: "strict" });
    setUser(token);
    // await fetchUserData();
    setTimeout(async () => {
      navigate("/dashboard");
    }, 2500);
  };

  const logout = () => {
    Cookies.remove("jwtToken");
    setUser(null);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleUpdate = () => setUpdate(!update);
  return (
    <UserContext.Provider
      value={{ user, login, logout, loading, viewPreferenceModal, setViewPreferenceModal, update, handleUpdate }}
    >
      {children}
    </UserContext.Provider>
  );
};
