import styles from "./userPosts.module.css";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

export default function UsersPost({ postData }) {
  // console.log(postData);
  return (
    <div className={styles.userPost}>
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          <img
            src="https://res.cloudinary.com/dqz5b6jq9/image/upload/v1688041828/photo-1490195117352-aa267f47f2d9_k6g0rc.jpg"
            alt={postData?._id}
            className={styles.userImage}
          />
          <div className={styles.userName}>
            <p>Alena paul</p>
            <p>@ {postData?.username}</p>
          </div>
          <p className={styles.postDate}> 26th June,2023 </p>
        </div>
        <SlOptionsVertical />
      </div>
      <div className={styles.postContainer}>{postData?.content}</div>
      {/* <hr /> */}
      <div className={styles.postFooter}>
        <div className={styles.likePost}>
          <AiOutlineHeart />
          <p>{postData?.likes?.likeCount}</p>
        </div>
        <div className={styles.bookmarkPost}>
          <BsBookmark />
        </div>
      </div>
    </div>
  );
}
