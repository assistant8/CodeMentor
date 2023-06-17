import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuSprout } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../state/userState";
import { Modal } from "../../components/modal";
import chart from "../../image/chart-bar.png";
import bookmark from "../../image/bookmark.svg";
import check from "../../image/check.svg";
import { api } from "../../libs/utils/api";
import defaultProfileImage from "../../image/defaultProfileImage.png";

const User = () => {
  const email = useRecoilValue(userState).email;
  const [user, setUser] = useState("");
  useEffect(() => {
    api.get(`/users/profile/?email=${email}`).then((res) => setUser(res.data));
  }, []);
  console.log("user : ", user);
  let navigate = useNavigate();
  return (
    <div className={styles.userInfo}>
      <div className={styles.profileImg}>
        {/* 여기!!! */}
        {user.image === null ? (
          <>
            <img src={defaultProfileImage} alt="프사" />
          </>
        ) : (
          <>
            <img src={user.image} alt="프사" />
          </>
        )}
        {/* <img src={user.image} alt="프사" /> */}
      </div>
      <div style={{ display: "flex" }}>
        <h3>{user.grade === "general" ? "코드 멘티, " : "코드 멘토, "}</h3>
        <h3>{user.userName === " " ? "이름을 설정해주세요" : user.userName}</h3>
      </div>
      <button>
        <MdOutlineKeyboardArrowRight
          onClick={() => navigate("/mypage/modify")}
        />
      </button>
    </div>
  );
};

const Grade = ({ openModal }) => {
  const user = useRecoilValue(userState);
  return (
    <div className={styles.gradeInfo}>
      <div className={styles.gradeImg}>
        {user.grade === "admin" ? (
          <FaGraduationCap className={styles.gradeIcon} />
        ) : (
          <LuSprout className={styles.gradeIcon} />
        )}
      </div>
      <h3>등급별 혜택보기</h3>
      <button onClick={openModal}>
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

const Menu = () => {
  let navigate = useNavigate();
  return (
    <div className={styles.menuContainer}>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/bookmark")}
      >
        <img src={bookmark} alt="내가 찜한 문제" />
        <p>내가 찜한 문제</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/complete")}
      >
        <img src={check} alt="내가 푼 문제" />
        <p>내가 푼 문제</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/chart")}
      >
        <img src={chart} alt="통계" />
        <p>통계</p>
      </div>
    </div>
  );
};

const LogOut = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [modalContent, setModalContent] = useState(""); // 상태 변수 추가

  const onClick = () => {
    api
      .post("/users/logout", {})
      .then((res) => {
        // 로그아웃 처리 성공
        // 여기!!!
        localStorage.removeItem("isLogin");

        navigate("/login");
        setUser({
          id: null,
          userName: "",
          email: "",
          image: null,
          grade: "",
          point: 0,
          createdAt: "",
          updatedAt: "",
          isEmailVerified: false,
          verificationCode: null,
        });
      })
      .catch((error) => {
        // 로그아웃 처리 실패
        openModal();
        setModalContent(error + "로그아웃에 실패했습니다.");
      });
  };

  return (
    <>
      <p className={styles.logout} onClick={onClick}>
        로그아웃
      </p>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <User />
      <Grade openModal={openModal} />
      <Menu />
      <LogOut />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GiCancel className={styles.closeBtn} onClick={closeModal} />
        <div className={styles.gradeContainer}>
          <div className={styles.gradeBox}>
            <div className={styles.gradeProfile}>
              <FaGraduationCap className={styles.gradeIcon} />
              <p>코드 멘토</p>
            </div>
            <div className={styles.description}>힌트 등록, 수정 가능</div>
          </div>
          <div className={styles.gradeBox}>
            <div className={styles.gradeProfile}>
              <LuSprout className={styles.gradeIcon} />
              <p>코드 멘티</p>
            </div>
            <div className={styles.description}>힌트 열람만 가능</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;
