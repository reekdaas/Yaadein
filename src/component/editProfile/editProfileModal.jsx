import { createPortal } from "react-dom";
import { MdCancel } from "react-icons/md";
import styles from "./editProfile.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { useDetectOutsideClick } from "../../hook/clickOutsideHandler";
import { useState } from "react";
import AvatarImages from "./avatarImages";
import { useAllUserContext } from "../../context";

export default function EditProfileModal({ handleModal, userInfo }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const {
    allUserData: { currentUser },
    userDispatch,
    editUserProfile,
  } = useAllUserContext();
  const { userData } = useAuthContext();

  const domNode = useDetectOutsideClick(() => {
    handleModal(false);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    userDispatch({
      type: "UPDATE_USER",
      payload: { ...currentUser, [name]: value },
    });
  };

  const handleSubmit = () => {
    editUserProfile({ ...currentUser, username: userData?.username });
    handleModal(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const tempImageURL = URL.createObjectURL(file);
    // console.log(URL.createObjectURL(file));
    userDispatch({
      type: "UPDATE_USER",
      payload: { ...currentUser, avatarUrl: tempImageURL },
    });
  };

  return createPortal(
    <div className={styles.editModal}>
      <div className={styles.modalOverlay}></div>
      <div className={styles.editModalContainer} ref={domNode}>
        <div className={styles.editModalHeader}>
          <p>Edit Modal</p>
          <span
            className={styles.cancelBtn}
            onClick={() => {
              handleModal(false);
            }}
          >
            {" "}
            <MdCancel />
          </span>
        </div>
        <div className={styles.editImage}>
          {" "}
          <img
            className={styles.modalImage}
            src={currentUser?.avatarUrl}
            alt={userInfo?.username}
          />
          <button
            className={styles.editAvatar}
            onClick={() => {
              setShowImageModal(true);
            }}
          >
            Choose Avatar
          </button>
          <label className={styles.editImgBtn}>
            Choose Image
            <input type="file" onChange={handleImageChange} accept="image/*" />
          </label>
          {/* <button >Choose Image</button> */}
        </div>

        {showImageModal && <AvatarImages handleAvatar={setShowImageModal} />}
        <div className={styles.editName}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              className={styles.editNameInput}
              value={currentUser?.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              className={styles.editNameInput}
              value={currentUser?.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.editLink}>
          <label htmlFor="linkInput">Link: </label>
          <input
            type="text"
            name="website"
            id="linkInput"
            value={currentUser?.website}
            onChange={handleChange}
          />
        </div>
        <div className={styles.editBio}>
          <label>Bio: </label>
          <textarea
            name="bio"
            className={styles.userBio}
            rows="2"
            value={currentUser?.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className={styles.profileEditBtn} onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
