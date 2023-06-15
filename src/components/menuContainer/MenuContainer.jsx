import styles from "./MenuContainer.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PATH from "../../constants/path";

export const MenuContainer = ({ style, isImgNeed = true, onClick, category }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedFilter, setSelectedFilter] = useState();
  const navigate = useNavigate();

  // const handleItemClick = useCallback((item)=>{
  //   setSelectedCategory(item);
  // }, [])

  const handleFilterClick = useCallback((item)=>{
    setSelectedFilter(item);
  }, [])

  useEffect(()=>{
    setSelectedCategory(category);
  }, [category])

  return (
    <div className={styles.menuContainer}>
      <div className={styles.categoryContainer}>
        <ul>
          <li
            className={selectedCategory === '전체' ? styles.selected : ''}
            onClick={() => onClick('전체')}
          >
            전체
          </li>
          <li
            className={selectedCategory === '백준' ? styles.selected : ''}
            onClick={() => onClick('백준')}
          >
            백준
          </li>
          <li
            className={selectedCategory === '프로그래머스' ? styles.selected : ''}
            onClick={() => onClick('프로그래머스')}
          >
            프로그래머스
          </li>
        </ul>
      </div>
      {isImgNeed && (
        <div className={styles.imageContainer}>
          <img src={bookmark} alt="bookmark" 
            className={selectedFilter === 'bookmark' ? styles.selectedFilter : ''}
            onClick={() => navigate(PATH.MYPAGE + `/bookmark`)}
          />
          <img src={check} alt="check" 
            className={selectedFilter === 'check' ? styles.selectedFilter : ''}
            onClick={() => navigate(PATH.MYPAGE + `/complete`)}
          />
        </div>
      )}
    </div>
  );
};
