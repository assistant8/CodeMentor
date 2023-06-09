import styles from "./AdminMenuContainer.module.scss";
import { useCallback, useEffect, useState, } from "react";
import plus from '../../image/plus.png'
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

export const AdminMenuContainer = ({ style, isImgNeed = true, onClick, category }) => {
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedFilter, setSelectedFilter] = useState();

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
      <div className={styles.imageContainer}>
          <img 
            className={styles.image}
            src={plus} alt="create"
            onClick={() => {
              navigate(PATH.ADMIN_CREATE);
            }}
          />
      </div>
    </div>
  );
};
