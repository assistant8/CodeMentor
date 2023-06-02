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
            <HintContainer hintTitle={"힌트 1"} hintContent={"풀어줘요"} isOpen={true}/>
            <HintContainer hintTitle={"힌트 2"} hintContent={"여기는무슨힌트가숨겨져이씅ㄹ까?"}/>
            <HintContainer hintTitle={"힌트 3"} hintContent={"컴포넌트 테스트용"} isAdmin={true}/>
        </div>
    )
}