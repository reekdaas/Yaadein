import { BsEmojiSmile } from "react-icons/bs";

import styles from "./createPostForm.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useDetectOutsideClick } from "../../hook/clickOutsideHandler";
import { usePostContext } from "../../context";

export default function CreatePostForm() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [post, setPost] = useState({ content: "" });

  const { createPostByUser, btnDisabled } = usePostContext();
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  const { _id: userId, username, avatarUrl, firstName } = userData;
  let domNode = useDetectOutsideClick(() => {
    setShowEmoji(false);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostByUser(post?.content);
    // console.log(post);
  };

  const handleEmoji = (emo) => {
    setPost((prev) => ({ ...prev, content: prev?.content + emo.emoji }));
  };
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.createPostFormCard}>
      <img
        className={styles.userImage}
        src={avatarUrl}
        alt={username}
        onClick={() => {
          navigate(`/userprofile/${userId}`);
        }}
      />
      <form className={styles.createPostForm} onSubmit={handleSubmit}>
        <textarea
          name="content"
          rows="2"
          className={styles.createPostText}
          placeholder={`What is happening ${firstName} ?!`}
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
            {" "}
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
              btnDisabled || !post?.content
                ? `${styles.createPostBtn} ${styles.disableBtn} `
                : `${styles.createPostBtn}`
            }
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
