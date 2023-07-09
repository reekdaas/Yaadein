import { FollowContainer, Header, Slider, UsersPost } from "../../component";
import Spinner from "../../component/spinner/spinner";
import { useAllUserContext, usePostContext } from "../../context";
import styles from "./bookMarks.module.css";

export default function BookMarks() {
  const {
    postState: { allPosts },
  } = usePostContext();
  const {
    allUserData: { bookmarkedPosts },
    isLoading,
  } = useAllUserContext();
  // console.log(bookmarkedPosts);

  const bookMarkPostList = bookmarkedPosts
    ?.toReversed()
    .map(({ _id }) => allPosts.find((post) => post._id === _id));
  // console.log(bookMarkPostList);

  return (
    <div className={styles.bookmarkPage}>
      <Slider />

      <div className={styles.bookmarkPageContainer}>
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
            <Header heading={"Bookmarks"} />
            {bookmarkedPosts?.length === 0 ? (
              <h1 className={styles.noBookMark}>No Bookmarks Yet</h1>
            ) : (
              bookMarkPostList?.map((data) => (
                <UsersPost postData={data} key={data?._id} />
              ))
            )}
          </>
        )}
      </div>

      <FollowContainer />
    </div>
  );
}
