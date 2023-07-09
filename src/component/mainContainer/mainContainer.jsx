import { usePostContext } from "../../context";
import { useAuthContext } from "../../context/AuthContext";
import CreatePostForm from "../createPost/createPostForm";
import Header from "../header/header";
import UsersPost from "../usersPost/usersPost";
import styles from "./mainContainer.module.css";

import Spinner from "../spinner/spinner";
import Filter from "../filter/filter";
import { getSortedPosts } from "../../utils/sortingUtils";

export default function MainContainer() {
  const { userData } = useAuthContext();

  const {
    postState: { allPosts },
    isLoading,
    filterType,
  } = usePostContext();

  const homePagePosts = allPosts.filter(
    ({ username }) => username !== userData.username
  );
  const sortedPosts = getSortedPosts(homePagePosts, filterType);

  return (
    <div className={styles.mainContainer}>
      <Header heading={"Home"} />
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <>
          <CreatePostForm />

          <Filter />

          <main className={styles.allPosts}>
            {sortedPosts?.map((post) => (
              <UsersPost postData={post} key={post?._id} />
            ))}
          </main>
        </>
      )}
    </div>
  );
}
