import styles from "./userProfile.module.css";
import { BsLink45Deg } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { getDate } from "../../utils/dateUtils";
import { useAuthContext } from "../../context/AuthContext";
// import Spinner from "../spinner/spinner";
import { useAllUserContext } from "../../context";
import { useState } from "react";
import FollowersList from "../followers/followersList";
import EditProfileModal from "../editProfile/editProfileModal";

export default function UserProfile({ userData, numberOfPosts }) {
  const {
    followUserMethod,
    // allUserData: { currentUser },
    userDispatch,
    isBtnDisabled,
    unfollowUserMethod,
  } = useAllUserContext();
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [showEditProfileModal, setEditProfileModal] = useState(false);

  const { userData: loggedInUser } = useAuthContext();
  const showEditBtn = loggedInUser?._id === userData._id;

  // console.log(showEditBtn);

  const followersOfUsers = userData?.followers || [];
  const followingOfUsers = userData?.following || [];

  const isFollowdByCurrentUser = followersOfUsers?.find(
    ({ _id }) => _id === loggedInUser?._id
  );

  const handleFollow = () => {
    if (isFollowdByCurrentUser) unfollowUserMethod(userData?._id);
    else followUserMethod(userData?._id);
  };

  return (
    <div className={styles.UserDataContainer}>
      <div className={styles.userDataPofileHeader}>
        <img
          className={styles.userProfileImage}
          src={userData?.avatarUrl}
          alt={userData?.firstName}
        />

        {showEditBtn ? (
          <button
            className={styles.profileEditBtn}
            onClick={() => {
              setEditProfileModal((prev) => !prev);
              userDispatch({
                type: "UPDATE_USER",
                payload: {
                  firstName: userData?.firstName,
                  lastName: userData?.lastName,
                  avatarUrl: userData?.avatarUrl,
                  bio: userData?.bio,
                  website: userData?.website,
                },
              });
            }}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className={
              isBtnDisabled
                ? `${styles.profileEditBtn} ${styles.disabledBtn} `
                : `${styles.profileEditBtn}`
            }
            onClick={handleFollow}
          >
            {isFollowdByCurrentUser ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <div className={styles.userProfileInfo}>
        <p>
          {userData?.firstName} {userData?.lastName}
        </p>
        <p className={styles.userDataUserName}>@{userData?.username}</p>
      </div>
      <p className={styles.userProfileBio}>{userData?.bio}</p>
      <div className={styles.userProfileContent}>
        <div className={styles.userWebsite}>
          <span>
            {" "}
            <BsLink45Deg />
          </span>

          <a
            href={userData?.website}
            className={styles.userWebsiteLink}
            target="_"
          >
            {userData?.website}
          </a>
        </div>
        <p className={styles.userJoinDate}>
          <SlCalender />
          <span>{getDate(userData.createdAt)}</span>
        </p>
      </div>
      <div className={styles.userProfileFooter}>
        <div className={styles.userProfileFooterItem}>
          <p>{numberOfPosts} posts </p>
        </div>
        <div
          className={styles.userProfileFooterItem}
          onClick={() => {
            setFollowerModal((prev) => !prev);
          }}
        >
          <p> {followersOfUsers.length} Followers</p>
          {followerModal && (
            <FollowersList
              handleModal={setFollowerModal}
              list={followersOfUsers}
              followers
            />
          )}
        </div>
        <div
          className={styles.userProfileFooterItem}
          onClick={() => {
            setFollowingModal((prev) => !prev);
          }}
        >
          <p>{followingOfUsers.length} Following</p>
          {followingModal && (
            <FollowersList
              handleModal={setFollowingModal}
              list={followingOfUsers}
            />
          )}
        </div>
      </div>
      {showEditProfileModal && (
        <EditProfileModal
          handleModal={setEditProfileModal}
          userInfo={userData}
        />
      )}
    </div>
  );
}
