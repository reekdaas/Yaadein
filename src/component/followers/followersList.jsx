import { useNavigate } from "react-router";
import { useDetectOutsideClick } from "../../hook/clickOutsideHandler";
import styles from "./followersList.module.css";

export default function FollowersList({ handleModal, list, followers }) {
  const navigate = useNavigate();
  let domNode = useDetectOutsideClick(() => {
    handleModal(false);
  });

  return (
    <div className={styles.followList} ref={domNode}>
      <p className={styles.followListHeading}>
        {" "}
        {followers ? "Followers List" : "Following List"}
      </p>
      {list.length > 0 ? (
        <ul>
          {list?.map((info) => (
            <li
              className={styles.followerAvatar}
              key={info?._id}
              onClick={() => {
                navigate(`/userprofile/${info?._id}`);
              }}
            >
              <img
                src={info?.avatarUrl}
                alt={info?.username}
                className={styles?.followerImage}
              />
              <div className={styles?.followerInfo}>
                <p>
                  {info?.firstName} {info?.lastName}
                </p>
                <p>@{info?.username}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noFollowr}>
          No {followers ? "Followers" : "Following"} yet!
        </p>
      )}
    </div>
  );
}
