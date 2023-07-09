import { createContext, useContext, useState } from "react";
import { logInService, signUpService } from "../services/authService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);
export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage?.getItem("userDetails")) || null
  );
  const [loading, setLoading] = useState(false);

  const userLogIn = async (userData) => {
    try {
      setLoading(true);
      // console.log(userData);
      const response = await logInService(userData);

      const {
        data: { encodedToken: token, foundUser },
      } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(foundUser));
      setToken(token);
      setUserData(foundUser);
      toast.success("Welcome Back");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong,Check Your Input!");
    } finally {
      setLoading(false);
    }
  };
  const userLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setToken(null);
    setUserData(null);
    toast.success("Logged Out Successfully!!");
    navigate("/login");
  };

  const signUpUser = async ({
    firstName,
    lastName,
    username,
    password,
    avatarUrl,
  }) => {
    try {
      setLoading(true);
      const response = await signUpService(
        firstName.trim(),
        lastName.trim(),
        username.trim(),
        password.trim(),
        avatarUrl
      );
      const {
        data: { createdUser, encodedToken },
        status,
      } = response;
      if (status === 201) {
        setUserData(createdUser);
        setToken(encodedToken);
        toast.success("Welcome User");
        navigate("/");
      }
    } catch (err) {
      const { status } = err;
      if (status === 422) {
        toast.error("Username already exist!");
      } else toast.error("Something went wrong");
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    token,
    userData,
    setToken,
    setUserData,
    signUpUser,
    loading,
    userLogIn,
    userLogOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
