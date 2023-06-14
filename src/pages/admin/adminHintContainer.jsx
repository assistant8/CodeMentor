import styles from './adminHintContainer.module.scss'
import {useState} from "react";

export default function AdminHintContainer({ hintLevel, hintContent, onChange }) {
    return (
        <div className={styles.hintContainer}>
            <div className={styles.hintName}>
                <div className={styles.hintTitle}>힌트 {hintLevel}</div>
                <input className={styles.hintContent}
                  type="text"
                  value={hintContent}
                  placeholder={"힌트를 입력해주세요"}
                  onChange={onChange} 
                />
            </div>
        </div>
    );
}