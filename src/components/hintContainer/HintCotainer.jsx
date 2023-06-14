import styles from './HintContainer.module.scss'
import {useState} from "react";

const HintContentBox = ({hintContent, isAdmin, isOpen}) => {
    const [hintInputValue, setHintInputValue] = useState(hintContent);
    if (isAdmin) {
        const handleChange = (e) => {
            setHintInputValue(e.target.value);
        }
        return (
            <input className={styles.hintContent}
                   type="text"
                   value={hintInputValue}
                   placeholder={"힌트를 입력해주세요"}
                   onChange={handleChange}
            />
        )
    }
    return (
        <div className={isOpen ? styles.hintContent : styles.blurContent}>
            {hintContent}
        </div>
    )
}

export default function HintContainer({hintTitle, hintLevel, hintContent, isAdmin = false, isOpen = false}) {
    return (
        <div className={styles.hintContainer}>
            <div className={styles.hintName}>
                <div className={styles.hintTitle}>{hintTitle}</div>
                <HintContentBox hintContent={hintContent} isAdmin={isAdmin} isOpen={isOpen}/>
            </div>
        </div>
    );
}