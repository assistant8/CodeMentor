import { HintContainer } from "../../components/hintContainer/HintCotainer";
import styles from './Quiz.module.scss'

const QuizNameContainer = () => {
    return (
        <div>
            문제제목, 찜, 품, 타이머시작
        </div>
    )
}
const TimerContainer = () => {
    return (
        <div>
            큰 타이머
        </div>
    )
}
export default function Quiz() {
    return (
        <div className={styles.quizContainer}>
            <QuizNameContainer />
            <TimerContainer />
            <HintContainer />
        </div>
    )
}