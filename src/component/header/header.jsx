import styles from "./header.module.css";

export default function Header({ heading }) {
  return (
    <div className={styles.header}>
      <h2>{heading}</h2>
    </div>
  );
}
