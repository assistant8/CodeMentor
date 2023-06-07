import styles from "./modal.module.scss";

export const GradeModal = ({ isOpen, children }) => {
  // 누르면 모달 띄우게 하려는 버튼 컴포넌트에서 아래 설정

  //const [isOpen, setIsOpen] = useState(false);

  //const openModal = () => {
  //  setIsOpen(true);
  //};

  //const closeModal = () => {
  //  setIsOpen(false);
  //};

  if (!isOpen) return null;

  return (
    <div className={styles.reactModalOverlay}>
      <div className={styles.reactModal}>{children}</div>
    </div>
  );
};
