import { useState } from "react";
import styles from "./login.module.css";
import { BiSolidHide, BiShowAlt } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { dummyData } from "../../utils/constant";
// import { useAllUserContext } from "../../context/userContext/allUserContext";
// import { usePostContext } from "../../context/postContext/allPostsContext";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function LogIn() {
  const navigate = useNavigate();
  const { userLogIn } = useAuthContext();
  // const { getAllUsersData } = useAllUserContext();
  // const { getAllPosts } = usePostContext();
  const [showPassword, setShowPassword] = useState(false);
  const [logInData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setLoginData((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const handleGuestSubmit = () => {
    setLoginData((prev) => ({
      ...prev,
      username: dummyData?.username,
      password: dummyData?.password,
    }));
    if (logInData?.username) {
      userLogIn(logInData);
    }
  };
  const handleLogin = () => {
    userLogIn(logInData);
    // getAllPosts()
    // getAllUsersData()
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authLogIn}>
        <h2>Log In</h2>

        <form className={styles.formPage}>
          <div className={styles.signInput}>
            <label htmlFor="user">Username:</label>{" "}
            <input
              id="user"
              type="text"
              placeholder="Enter Your Username"
              name="username"
              value={logInData.username}
              onChange={inputChangeHandler}
              required
            />{" "}
          </div>
          <div className={styles.passwordWrapper}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={logInData.password}
              onChange={inputChangeHandler}
              required
            />
            <span
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <BiShowAlt /> : <BiSolidHide />}{" "}
            </span>
          </div>

          <div className={styles.signInBtn}>
            <button
              className={styles.loginBtn}
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className={styles.dummyLoginBtn}
              type="button"
              onClick={handleGuestSubmit}
            >
              Guest Login
            </button>
          </div>
        </form>

        <p
          className={styles.createAcc}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create New Account <span>{<AiOutlineArrowRight />}</span>
        </p>
      </div>
    </div>
  );
}
