import { useParams } from "react-router";
import FollowContainer from "../../component/followContainer/followContainer";
import Header from "../../component/header/header";
import Slider from "../../component/slider/slider";
import UserProfile from "../../component/userProfile/userProfile";
import UsersPost from "../../component/usersPost/usersPost";
import { useAllUserContext, usePostContext } from "../../context";
import { useAuthContext } from "../../context/AuthContext";
import { posts } from "../../postData";
import { sortByLatest } from "../../utils/sortingUtils";
import { postOfCurrentUser } from "../../utils/userUtils";
// import { getDate } from "../../utils/dateUtils";
import styles from "./profilePage.module.css";
import { useEffect } from "react";
import Spinner from "../../component/spinner/spinner";

export default function ProfilePage() {
  const { id: currentUserId } = useParams();
  // console.log(id);
  const {
    postState: { allPosts },
  } = usePostContext();
  const {
    allUserData: { allUsers, user },
    isLoading,
    getUserById,
  } = useAllUserContext();
  useEffect(() => {
    getUserById(currentUserId);
  }, [currentUserId, allUsers]);

  // const { userData } = useAuthContext();
  // const getCurrentUser = allUsers.find(({ _id }) => _id === currentUserId);

  const currentUsersPostList = postOfCurrentUser(allPosts, user?.username);
  const latestPost = sortByLatest(currentUsersPostList);

  return (
    <div className={styles.profilePage}>
      <Slider />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.profilePageContainer}>
          <Header heading={user?.firstName + " " + user?.lastName} />
          <UserProfile
            userData={user}
            numberOfPosts={currentUsersPostList.length}
          />
          {latestPost?.map((data) => (
            <UsersPost postData={data} key={data?._id} />
          ))}
        </div>
      )}

      <FollowContainer />
    </div>
  );
}
