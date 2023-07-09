import { useEffect } from "react";
import { FollowContainer, Slider, UsersPost, Header } from "../../component";
import { usePostContext } from "../../context";
import { posts } from "../../postData";
import styles from "./explorePage.module.css";
import Spinner from "../../component/spinner/spinner";
import { sortByLatest } from "../../utils/sortingUtils";

export default function ExplorePage() {
  const {
    postState: { allPosts },
    getAllPosts,
    isLoading,
  } = usePostContext();

  useEffect(() => {
    getAllPosts();
  }, []);
  const latestPosts = sortByLatest(allPosts);

  // console.log(allPosts);
  return (
    <div className={styles.explorePage}>
      <Slider />
      <div className={styles.mainContainer}>
        <Header heading={"Explore Page"} />
        {isLoading ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.exploreContainer}>
            {latestPosts?.map((post) => (
              <UsersPost postData={post} key={post?._id} />
            ))}
          </div>
        )}
      </div>
      <FollowContainer />
    </div>
  );
}
