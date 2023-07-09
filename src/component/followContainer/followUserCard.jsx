import { useEffect } from "react";
import { useAllUserContext } from "../../context";
import styles from "./followCard.module.css";
import { useNavigate } from "react-router";

export default function FollowUserCard({ data }) {
  const navigate = useNavigate();
  const { _id: userId, firstName, lastName, username, avatarUrl } = data;
  const {
    getUserById,
    allUserData: { allUsers },
    followUserMethod,
  } = useAllUserContext();

  // useEffect(() => {
  //   getUserById(userId);
  // }, [userId]);
  const handleFollow = () => {
    followUserMethod(data?._id);
  };

  return (
    <div className={styles.followUserCard}>
      <img
        src={avatarUrl}
        alt={username}
        className={styles.followUserCardAvatar}
        onClick={() => {
          navigate(`/userprofile/${userId}`);
        }}
      />
      <div className={styles.followUserInfo}>
        <p className={styles.followUserName}>
          {firstName} {lastName}
        </p>
        <p className={styles.userName}>@{username}</p>
      </div>

      <button className={styles.followUserBtn} onClick={handleFollow}>
        Follow
      </button>
    </div>
  );
}
