import { NavLink, useNavigate } from "react-router-dom";
import styles from "./side.module.css";
import { AiFillHome, AiOutlinePlusSquare } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { BiBookmarks } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

import PostModal from "../createPost/postModal";

export default function Slider() {
  const navigate = useNavigate();

  const { userData, userLogOut } = useAuthContext();

  const [showModal, setShowModal] = useState(false);

  const giveClassName = ({ isActive }) =>
    isActive ? `${styles.linkActive} ${styles.navlink}` : `${styles.navlink}`;
  const handleLogout = () => {
    userLogOut();
  };

  return (
    <nav className={styles.sideBar}>
      <h2
        className={styles.sideBarHeading}
        onClick={() => {
          navigate("/");
        }}
      >
        Yaadein
      </h2>
      <ul className={styles.sideBarContainer}>
        <li>
          <NavLink className={giveClassName} to="/">
            <AiFillHome />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink className={giveClassName} to="/explore">
            <MdOutlineExplore />
            <p>Explore</p>
          </NavLink>
        </li>
        <li>
          <NavLink className={giveClassName} to="/bookmarks">
            <BiBookmarks />
            <p>Bookmarks</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={giveClassName}
            to={`/userprofile/${userData?._id}`}
          >
            <BsPersonCircle />
            <p>Profile</p>
          </NavLink>
        </li>

        <li
          className={styles.createPostBtn}
          onClick={() => {
            setShowModal((prev) => !prev);
          }}
        >
          <AiOutlinePlusSquare />
          <p>Create Post</p>
        </li>
      </ul>
      <div>
        <div className={styles.logOutBtn} onClick={handleLogout}>
          <span>
            <FiLogOut />
          </span>

          <p>Logout</p>
        </div>
      </div>
      {showModal && <PostModal handleModal={setShowModal} />}
    </nav>
  );
}
