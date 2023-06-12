import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import baekjoon from "../../image/baekjoonlogo.png";
import programmers from "../../image/programmers-logo-dark.png";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>환영합니다!</div>
      <div className={styles.linkBox}>
        <div className={styles.linkTitle}>백준 ▼</div>
        <div>
          <Link to="https://www.acmicpc.net/" target="_blank">
            <img className={styles.linkImg} src={baekjoon} alt="백준" />
          </Link>
        </div>
      </div>
      <div className={styles.linkBox}>
        <div className={styles.linkTitle}>프로그래머스 ▼</div>
        <div>
          <Link to="https://programmers.co.kr/" target="_blank">
            <img
              className={styles.linkImg}
              src={programmers}
              alt="프로그래머스"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
