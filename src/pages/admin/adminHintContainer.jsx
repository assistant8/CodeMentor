import styles from './adminHintContainer.module.scss'
import plusIcon from '../../image/plus.png'

export default function AdminHintContainer({ hintLevel, hintContent, onChange, showImage=true, onClick }) {

    const maplevelToQuestion = {
        1: "문제 유형은 무엇인가요?", 
        2: "세부 유형 또는 고려해야할 부분은 무엇일까요?",
        3: "필수적으로 사용해야하는 것은 무엇인가요?",
        4: "놓칠 수 있을만한 테스트 케이스는 무엇이 있을까요?",
    }

    return (
        <div className={styles.hintContainer}>
            <div className={styles.hintName}>
                <div className={styles.hintUpper}>
                    <div className={styles.hintTitle}>
                        {maplevelToQuestion[hintLevel]}
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