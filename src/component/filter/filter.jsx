import { useState } from "react";
import styles from "./filter.module.css";
import { IoIosOptions } from "react-icons/io";
import { usePostContext } from "../../context/postContext/allPostsContext";
import { useDetectOutsideClick } from "../../hook/clickOutsideHandler";

export default function Filter() {
  const { filterType, setFilterType } = usePostContext();
  const [showModal, setShowModal] = useState(false);
  const domNode = useDetectOutsideClick(() => {
    setShowModal(false);
  });
  const filters = ["Trending", "Latest", "Oldest"];

  return (
    <div className={styles.filterContainer}>
      <p>{filterType} Posts</p>

      <IoIosOptions
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
        className={styles.filterBtn}
      />

      {showModal && (
        <ul className={styles.filterDropdown} ref={domNode}>
          {filters.map((filter, i) => (
            <li
              key={i}
              onClick={() => {
                setFilterType(filter);
                setShowModal((prev) => !prev);
              }}
              className={filterType === filter ? `${styles.active}` : " "}
            >
              {filter}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
