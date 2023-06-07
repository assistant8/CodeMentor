import styles from "./modal.module.scss";

export const GradeModal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.reactModalOverlay}>
      <div className={styles.reactModal}>{children}</div>
    </div>
  );
};
