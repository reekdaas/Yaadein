import { useAllUserContext } from "../../context";
import { useDetectOutsideClick } from "../../hook/clickOutsideHandler";
import { avatarImages } from "../../utils/constant";
import styles from "./avatarImages.module.css";

export default function AvatarImages({ handleAvatar }) {
  const {
    userDispatch,
    allUserData: { currentUser },
  } = useAllUserContext();

  let domNode = useDetectOutsideClick(() => {
    handleAvatar(false);
  });

  const handleAvatarImage = (e) => {
    // console.log(e.target.src);
    userDispatch({
      type: "UPDATE_USER",
      payload: { ...currentUser, avatarUrl: e.target.src },
    });
    handleAvatar(false);
  };

  return (
    <div className={styles.avatarImageModal}>
      <h3>Choose Avatar</h3>
      <div className={styles.avatarImageContainer} ref={domNode}>
        {avatarImages.map((imgLink) => (
          <img
            src={imgLink}
            alt="avatarImage"
            key={imgLink}
            className={styles.avatarImage}
            onClick={handleAvatarImage}
          />
        ))}
      </div>
    </div>
  );
}
