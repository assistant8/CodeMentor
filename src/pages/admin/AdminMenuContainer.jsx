import styles from "./AdminMenuContainer.module.scss";
import plus from '../../image/plus.png'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { categoryState} from '../../state/store.js';

export const AdminMenuContainer = ({ onClick }) => {

  const selectedCategory = useRecoilValue(categoryState);
  const navigate = useNavigate();

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
            className={selectedCategory === 0 ? styles.selected : ''}
            onClick={() => onClick(0)}  // category === 0
          >
            백준
          </li>
          <li
            className={selectedCategory === 1 ? styles.selected : ''}
            onClick={() => onClick(1)}  // category === 1
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
