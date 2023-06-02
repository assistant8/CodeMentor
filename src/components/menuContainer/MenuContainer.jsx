import styles from "./MenuContainer.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { useState } from "react";

export const MenuContainer = ({ style, isImgNeed = true }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedFilter, setSelectedFilter] = useState('전체');


  const handleItemClick = (item) => {
    console.log(item)
    setSelectedCategory(item);
  };

  const handleFilterClick = (item) => {
    console.log(item)
    setSelectedFilter(item)
  }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.categoryContainer}>
        <ul>
          <li
            className={selectedCategory === '전체' ? styles.selected : ''}
            onClick={() => handleItemClick('전체')}
          >
            전체
          </li>
          <li
            className={selectedCategory === '백준' ? styles.selected : ''}
            onClick={() => handleItemClick('백준')}
          >
            백준
          </li>
          <li
            className={selectedCategory === '프로그래머스' ? styles.selected : ''}
            onClick={() => handleItemClick('프로그래머스')}
          >
            프로그래머스
          </li>
        </ul>
      </div>
      {isImgNeed && (
        <div className={styles.imageContainer}>
          <img src={bookmark} alt="bookmark" 
            className={selectedFilter === 'bookmark' ? styles.selectedFilter : ''}
            onClick={() => handleFilterClick('bookmark')}
          />
          <img src={check} alt="check" 
            className={selectedFilter === 'check' ? styles.selectedFilter : ''}
            onClick={() => handleFilterClick('check')}
          />
        </div>
      )}
    </div>
  );
};
