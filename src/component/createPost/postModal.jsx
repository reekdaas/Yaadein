import styles from "./postModal.module.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { useDetectOutsideClick } from "../../hook/clickOutsideHandler";
import { createPortal } from "react-dom";
import { usePostContext } from "../../context";

export default function PostModal({ postData, handleModal, handleEditModal }) {
  const [showEmoji, setShowEmoji] = useState(false);

  const {
    postState: { post },
    createPostByUser,
    postDispatch,
    editPostByUser,
  } = usePostContext();

  const domNode = useDetectOutsideClick(() => {
    setShowEmoji(false);
  });
  // const postDomNode = useDetectOutsideClick(() => {
  //   postData ? handleEditModal(false) : handleModal(false);
  // });
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    postDispatch({ type: "UPDATE_POST", payload: { [name]: value } });
    // console.log(name, value);
  };
  const handleEmoji = (emo) => {
    const newPost = post?.content + emo?.emoji;
    postDispatch({ type: "UPDATE_POST", payload: { content: newPost } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (postData) {
      editPostByUser(postData?._id, post?.content);
      handleEditModal(false);
    } else {
      createPostByUser(post?.content);
      handleModal(false);
    }
    postDispatch({ type: "UPDATE_POST", payload: { content: "" } });
  };

  // console.log(post);
  return createPortal(
    <div className={styles.postModal}>
      {" "}
      <div
        className={styles.modalOverlay}
        onClick={() => {
          postData ? handleEditModal(false) : handleModal(false);
          postDispatch({ type: "UPDATE_POST", payload: { content: "" } });
        }}
      ></div>
      <div className={styles.postModalContainer}>
        <h2 className={styles.heading}>Create Post</h2>
        <form className={styles.createPostForm} onSubmit={handleSubmit}>
          <textarea
            name="content"
            rows="2"
            className={styles.createPost}
            value={post?.content}
            onChange={handleTextInputChange}
          ></textarea>
          <div className={styles.createPostContainer}>
            <div
              className={styles.createPostEmoji}
              onClick={() => {
                setShowEmoji((prev) => !prev);
              }}
            >
              <BsEmojiSmile />
            </div>
            {showEmoji && (
              <div className={styles.emojiPicker} ref={domNode}>
                <EmojiPicker
                  theme="dark"
                  onEmojiClick={handleEmoji}
                  emojiStyle="twitter"
                  emojiVersion="1.0"
                  suggestedEmojisMode="recent"
                  previewConfig={{
                    showPreview: false,
                  }}
                  height="300px"
                  searchDisabled
                  lazyLoadEmojis
                  skinTonesDisabled
                />
              </div>
            )}

            <button
              type="submit"
              className={
                !post?.content
                  ? `${styles.createPostBtn} ${styles.disabledBtn}`
                  : `${styles.createPostBtn}`
              }
              disabled={!post?.content}
            >
              {postData ? "Update" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
