import styles from "./AdminMenuContainer.module.scss";
import { useCallback, useEffect, useState, } from "react";
import plus from '../../image/plus.png'
import { useNavigate } from "react-router-dom";

export const AdminMenuContainer = ({ onClick, category }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.menuContainer}>
      <div className={styles.categoryContainer}>
        <ul>
          <li
            className={category === '전체' ? styles.selected : ''}
            onClick={() => onClick('전체')}
          >
            전체
          </li>
          <li
            className={category === '백준' ? styles.selected : ''}
            onClick={() => onClick('백준')}
          >
            백준
          </li>
          <li
            className={category === '프로그래머스' ? styles.selected : ''}
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
              navigate('/admin/create');
            }}
          />
      </div>
    </div>
  );
};
