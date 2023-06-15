import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import baekjoon from "../../image/baekjoonlogo.png";
import programmers from "../../image/programmers-logo-dark.png";
import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../state/userState";
import { api } from "../../libs/utils/api";

const Home = () => {
  const email = useRecoilValue(userState).email;
  const [user, setUser] = useState("");
  useEffect(() => {
    api.get(`/users/profile/?email=${email}`).then((res) => setUser(res.data));
    console.log(user);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>{`환영합니다 ${user.userName}님! `}</div>
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
