import { useState } from "react";
import styles from "./login.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { logInService } from "../../services/authService";
import { useNavigate } from "react-router";

const dummyData = {
  username: "rittikdas",
  password: "abcde",
};

export default function LogIn() {
  const navigate = useNavigate();
  const { setToken, setUserData } = useAuthContext();

  const [logInData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setLoginData((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const handleGuestSubmit = async () => {
    setLoginData({ ...dummyData });
    await logInService(dummyData, setToken, setUserData);
    navigate("/");
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authLogIn}>
        <h2>Log In</h2>

        <form className={styles.formPage}>
          <div className={styles.signInput}>
            <input
              type="text"
              placeholder="Enter Your Username"
              name="username"
              value={logInData.username}
              onChange={inputChangeHandler}
              required
            />
            <input
              type="text"
              placeholder="Enter Your Password"
              name="password"
              value={logInData.password}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className={styles.signInBtn}>
            <button
              className={styles.signBtn}
              type="button"
              onClick={handleGuestSubmit}
            >
              Guest Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
