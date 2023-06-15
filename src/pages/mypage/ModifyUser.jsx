import styles from "./ModifyUser.module.scss";
import { useNavigate } from "react-router-dom";
import { VioletButton } from "../../components/buttons/VioletButton";
import { useState, useRef, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Modal } from "../../components/modal";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import { api } from "../../libs/utils/api";

const ModifyUser = () => {
  const [modalContent, setModalContent] = useState("");
  const email = useRecoilValue(userState).email;
  const [user, setUser] = useState("");
  useEffect(() => {
    api.get(`/users/profile/?email=${email}`).then((res) => setUser(res.data));
  }, []);
  const [imgUrl, setImgUrl] = useState(user.image);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const modifyImg = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일 정보 가져오기
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result; // 파일을 URL 형태로 변환
      setImgUrl(url); // imgUrl 업데이트
    };
    if (file) {
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", fileInputRef.current.files[0]);
    api
      .post(`/users/profile/${user.id}/upload-image`, formData)
      .then((res) => {
        setModalContent("사진을 업로드했습니다.");
        openModal();
      })
      .catch((error) => {
        setModalContent(error + "사진 업로드에 실패했습니다.");
        openModal();
      });
  };

  const buttonRef = useRef(null);
  const profileImgRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setModalContent(""); // 모달 내용 비우기
  };
  const signOutConfirm = () => {
    setModalContent(
      <>
        <div className={styles.modalMessage}>회원을 탈퇴하시겠습니까?</div>
        <div className={styles.confirmBtns}>
          <div className={styles.confirmBtn} onClick={signOut}>
            네
          </div>
          <div className={styles.confirmBtn} onClick={closeModal}>
            아니오
          </div>
        </div>
      </>
    );
    openModal();
  };
  const signOut = () => {
    api
      .delete(`/users/profile/?email=${email}`)
      .then(() => {
        setModalContent("탈퇴 되었습니다. 이용해주셔서 감사합니다.");
        navigate("/login");
      })
      .catch((error) => {
        setModalContent(error + "회원 탈퇴에 실패했습니다.");
        openModal();
      });
  };
  return (
    <div className={styles.modifyContainer}>
      <FaPencilAlt className={styles.pencilIcon} onClick={modifyImg} />
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange} // 파일 선택 창은 보이지 않도록 설정
      />
      <div className={styles.modifyImg}>
        <img src={imgUrl} alt="프사" ref={profileImgRef} />
      </div>
      <VioletButton onClick={handleSubmit} ref={buttonRef}>
        저장하기
      </VioletButton>
      <div className={styles.btns}>
        <p
          onClick={() => {
            navigate("/mypage/password");
          }}
        >
          내 정보 변경
        </p>
        <p onClick={signOutConfirm}>회원 탈퇴</p>
        <div className={styles.modalWrapper}>
          <Modal isOpen={isOpen} closeModal={closeModal}>
            {modalContent}
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default ModifyUser;
