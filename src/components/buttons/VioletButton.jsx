import styles from "./VioletButton.module.scss";

export const VioletButton = ({ children, style, onClick }) => {
  return (
    <button className={styles.violetButton} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
