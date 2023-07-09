import { useAuthContext } from "../../context/AuthContext";
import { useAllUserContext } from "../../context/userContext/allUserContext";
import styles from "./followContainer.module.css";
import FollowUserCard from "./followUserCard";

export default function FollowContainer() {
  const { userData } = useAuthContext();

  const {
    allUserData: { allUsers },
  } = useAllUserContext();
  // console.log(allUsers);
  const followedByCurrentUser = allUsers.filter(
    (user) =>
      !user?.followers?.some(({ _id }) => _id === userData._id) &&
      user?._id !== userData._id
  );
  // console.log(followedByCurrentUser);
  // const followedUsers = allUsers.filter(({ _id }) => _id !== userData._id);

  return (
    <div className={styles.followedContainerSlider}>
      <h1>Who To Follow?</h1>

      <div className={styles.followedContainer}>
        {followedByCurrentUser?.length ? (
          <>
            {followedByCurrentUser?.map((data) => (
              <FollowUserCard data={data} key={data._id} />
            ))}
          </>
        ) : (
          <h3 className={styles.noSuggestion}>No More Suggestions!</h3>
        )}
      </div>
    </div>
  );
}
