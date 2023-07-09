import styles from "./userPosts.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { useAllUserContext, usePostContext } from "../../context";
import { getDate } from "../../utils/dateUtils";
import {
  getAuthorOfPosts,
  isPostAlreadyInBookmark,
} from "../../utils/userUtils";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import PostEdit from "./postEdit";

export default function UsersPost({ postData }) {
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const {
    postState: { allPosts },
    likedPostByUser,
    disLikedByUser,
  } = usePostContext();
  const {
    allUserData: { allUsers, bookmarkedPosts },
    addPostsToBookmark,
    removePostFromBookmark,
  } = useAllUserContext();

  const findAuthorOfPosts = getAuthorOfPosts(allUsers, postData);
  const date = getDate(postData?.createdAt);
  const postBelongsToCurrentUser = userData?.username === postData?.username;
  const idOfPostAuthor = findAuthorOfPosts?._id;

  const isPostInBookmark = isPostAlreadyInBookmark(bookmarkedPosts, postData);

  const handleBookmark = () => {
    if (isPostInBookmark) {
      removePostFromBookmark(postData?._id);
    } else {
      addPostsToBookmark(postData?._id);
    }
  };

  const getLikeOfPosts = postData?.likes?.likeCount;
  const isPostLikedByUser = postData?.likes?.likedBy?.some(
    ({ _id }) => _id === userData?._id
  );
  // console.log(isPostLikedByUser);

  const handleLikeHandler = () => {
    if (isPostLikedByUser) disLikedByUser(postData?._id);
    else likedPostByUser(postData?._id);
  };
  const checkIsPostPresent = allPosts.some(({ _id }) => postData?._id === _id);
  // console.log(checkIsPostPresent);
  if (!checkIsPostPresent) {
    if (isPostInBookmark) removePostFromBookmark(postData?._id);
    return null;
  }

  return (
    <div className={styles.userPost}>
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          <img
            src={findAuthorOfPosts?.avatarUrl}
            alt={postData?._id}
            className={styles.userImage}
            onClick={() => {
              navigate(`/userprofile/${idOfPostAuthor}`);
            }}
          />
          <div className={styles.userName}>
            <p>
              {findAuthorOfPosts?.firstName} {findAuthorOfPosts?.lastName}
            </p>
            <p>@{postData?.username}</p>
          </div>
          <p className={styles.postDate}>{date}</p>
        </div>
        <div>{postBelongsToCurrentUser && <PostEdit post={postData} />}</div>
      </div>
      <div className={styles.postContainer}>{postData?.content}</div>
      {/* <hr /> */}
      <div className={styles.postFooter}>
        <div
          className={
            isPostLikedByUser
              ? `${styles.likePost} ${styles.alreadyLiked} `
              : `${styles.likePost}`
          }
          onClick={handleLikeHandler}
        >
          <AiOutlineHeart />
          <p>{getLikeOfPosts}</p>
        </div>
        <div
          className={
            isPostInBookmark
              ? `${styles.bookmarkPost} ${styles.inBookmark} `
              : `${styles.bookmarkPost}`
          }
          onClick={handleBookmark}
        >
          <BsBookmarkFill />
        </div>
      </div>
    </div>
  );
}
