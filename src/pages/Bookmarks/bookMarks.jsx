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
  console.log(bookmarkedPosts);

  // const isElementPresent = allPosts?.some((post) =>
  //   bookmarkedPosts.map((bookMark) => bookMark?._id === post?._id)
  // );
  // console.log(isElementPresent);

  // const bookMarkPostList = allPosts
  //   .filter((post) =>
  //     bookmarkedPosts?.toReversed()?.find(({ _id }) => post?._id === _id)
  //   )
  //   ?.toReversed();

  // console.log(bookMarkPostList);
  // const removePost = bookmarkedPosts.filter((post) => post !== undefined);
  // console.log(removePost);

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
