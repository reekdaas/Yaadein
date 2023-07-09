import FollowContainer from "../../component/followContainer/followContainer";
import MainContainer from "../../component/mainContainer/mainContainer";
import Slider from "../../component/slider/slider";

import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <Slider />
      <MainContainer />
      <FollowContainer />
    </div>
  );
}
