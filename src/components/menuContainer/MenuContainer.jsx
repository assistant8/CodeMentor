import styles from "./MenuContainer.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";

export const MenuContainer = ({ style }) => {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.categoryContainer}>
        <ul>
          <li>전체</li>
          <li>백준</li>
          <li>프로그래머스</li>
        </ul>
      </div>
      <div className={styles.imageContainer}>
        <img src={bookmark} alt="bookmark" />
        <img src={check} alt="check" />
      </div>
    </div>
  );
};
