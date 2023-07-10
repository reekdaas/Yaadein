import { useState } from "react";
import styles from "./postEdit.module.css";
import { SlOptionsVertical } from "react-icons/sl";
import { useDetectOutsideClick } from "../../hook/clickOutsideHandler";
import { useAllUserContext, usePostContext } from "../../context";
import { isPostAlreadyInBookmark } from "../../utils/userUtils";
import PostModal from "../createPost/postModal";

export default function PostEdit({ post }) {
  const { deletePost, postDispatch } = usePostContext();
  const {
    allUserData: { bookmarkedPosts },
    removePostFromBookmark,
  } = useAllUserContext();

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const domNode = useDetectOutsideClick(() => {
    setShowModal(false);
  });

  const isPostInBookmark = isPostAlreadyInBookmark(bookmarkedPosts, post);

  const handleDelete = () => {
    if (isPostInBookmark) {
      removePostFromBookmark(isPostInBookmark?._id);
    }
    deletePost(post?._id);
  };
  const handleEdit = () => {
    setEditModal((prev) => !prev);
    postDispatch({ type: "UPDATE_POST", payload: { content: post?.content } });
  };

  return (
    <div className={styles.postEdit} ref={domNode}>
      <SlOptionsVertical
        className={styles.btn}
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      />
      {showModal && (
        <div className={styles.editModal}>
          <p onClick={handleEdit}>Edit</p>
          <p onClick={handleDelete}>Delete</p>
        </div>
      )}
      {editModal && (
        <PostModal handleEditModal={setEditModal} postData={post} />
      )}
    </div>
  );
}
