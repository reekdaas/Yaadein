import { useState } from "react";
import styles from "./signUp.module.css";

import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function SingUp() {
  const navigate = useNavigate();

  const { signUpUser } = useAuthContext();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatarUrl:
      "https://res.cloudinary.com/dqz5b6jq9/image/upload/v1688805545/Avatar_8_hp4vxg.jpg",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({ ...prev, [name]: value }));
    console.log(userDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userDetails?.password !== userDetails?.confirmPassword)
      toast.error("Password & confirm password must be same!");
    else signUpUser(userDetails);
  };
  // console.log(token);

  return (
    <div className={styles.signupPage}>
      <div className={styles.signUpCard}>
        {" "}
        <h2>Sign Up</h2>
        <form className={styles.signupContainer} onSubmit={handleSubmit}>
          <div className={styles.signupConainerFirstRow}>
            <div>
              {" "}
              <label htmlFor="firstInput">FirstName:</label>
              <input
                id="firstInput"
                type="text"
                name="firstName"
                value={userDetails?.firstName}
                onChange={handleChange}
                placeholder="Enter Firstname"
                required
              />
            </div>
            <div>
              {" "}
              <label htmlFor="secondInput">LastName:</label>
              <input
                id="secondInput"
                type="text"
                name="lastName"
                value={userDetails?.lastName}
                onChange={handleChange}
                placeholder="Enter Lastname"
                required
              />
            </div>
          </div>
          <div className={styles.signupConainerRow}>
            <label htmlFor="username">Username: </label>
            <input
              className={styles.userName}
              id="username"
              type="text"
              name="username"
              value={userDetails?.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div className={styles.signupConainerRow}>
            <label htmlFor="email">Email:</label>
            <input
              className={styles.userEmail}
              id="email"
              type="email"
              name="email"
              value={userDetails?.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className={styles.signupConainerRow}>
            <div className={styles.passwordWrapper}>
              <label htmlFor="password">Password: </label>
              <input
                className={styles.userPassword}
                id="pasword"
                type="text"
                value={userDetails?.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
            </div>
          </div>
          <div className={styles.signupConainerRow}>
            <div className={styles.passwordWrapper}>
              <label htmlFor="confirm-password">Confirm password:</label>
              <input
                className={styles.userConfirmPassword}
                id="confirm-password"
                type="text"
                value={userDetails?.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          <button className={styles.signUpBtn} type="submit">
            Sign Up
          </button>
        </form>
        <p
          className={styles.alreayAcc}
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have on account?
        </p>
      </div>
    </div>
  );
}
