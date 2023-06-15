import styles from "./HintContainer.module.scss";
import { useState } from "react";

const HintContentBox = ({ hintContent, isAdmin, isOpen }) => {
  const [hintInputValue, setHintInputValue] = useState(hintContent);
  if (isAdmin) {
    const handleChange = (e) => {
      setHintInputValue(e.target.value);
    };
    return (
      <input
        className={styles.hintContent}
        type="text"
        value={hintInputValue}
        placeholder={"힌트를 입력해주세요"}
        onChange={handleChange}
      />
    );
  }

  return (
    <div className={isOpen ? styles.hintContent : styles.blurContent}>
      {isOpen? hintContent : "블러처리된 내용입니다. 클릭처리 전엔 안보여드립니다!"}
    </div>
  );
}; 

export default function HintContainer({hintTitle, hintContent, onClick, isAdmin = false, isOpen = false}) {
    const [isHintOpen, setIsHintOpen] = useState(isOpen)
    const handleHintClick = () => {
        setIsHintOpen(true);
        console.log("isopen", isHintOpen)
    }
    
    return (
        <div className={styles.hintContainer} onClick={handleHintClick}>
            <div className={styles.hintName}>
                <div className={styles.hintTitle}>{hintTitle}</div>
                <HintContentBox hintContent={hintContent} isAdmin={isAdmin} isOpen={isHintOpen}/>
            </div>
        </div>
    );
}
