import { useNavigate } from "react-router";
import { useDetectOutsideClick } from "../../hook/clickOutsideHandler";
import styles from "./followersList.module.css";

const data = [
  {
    _id: "79Gksh9otl",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "johndoe123",
    bio: "Hello World",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dqz5b6jq9/image/upload/v1688041213/5_u91fuz.jpg",
    website: "https://google.com/",
    createdAt: "https://adarshbalika.netlify.app",
    // updatedAt: formatDate(),
  },
  {
    _id: "79Gksh9otl",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "johndoe123",
    bio: "Hello World",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dqz5b6jq9/image/upload/v1688041213/5_u91fuz.jpg",
    website: "https://google.com/",
    createdAt: "https://adarshbalika.netlify.app",
    // updatedAt: formatDate(),
  },
  {
    _id: "79Gksh9otl",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "johndoe123",
    bio: "Hello World",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dqz5b6jq9/image/upload/v1688041213/5_u91fuz.jpg",
    website: "https://google.com/",
    createdAt: "https://adarshbalika.netlify.app",
    // updatedAt: formatDate(),
  },
];

export default function FollowersList({ handleModal, list, followers }) {
  const navigate = useNavigate();
  let domNode = useDetectOutsideClick(() => {
    handleModal(false);
  });

  console.log(123);
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
