import styles from './adminHintContainer.module.scss'
import plusIcon from '../../image/plus.png'

export default function AdminHintContainer({ hintLevel, hintContent, onChange, showImage=true, onClick }) {
    return (
        <div className={styles.hintContainer}>
            <div className={styles.hintName}>
                <div className={styles.hintUpper}>
                    <div className={styles.hintTitle}>
                    힌트 {hintLevel}
                    </div>
                    {/* 첫 번째 힌트 컨테이너에는 이미지가 보이지않게 하기위한 설정 */}
                    {showImage && <img src={plusIcon} alt="register" onClick={onClick}/>}
                </div>
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