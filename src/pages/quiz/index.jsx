import HintContainer from "../../components/hintContainer/HintCotainer";
import styles from "./Quiz.module.scss";
import { useEffect, useState, useRef } from "react";
import Timer from "../../components/timer/Timer.jsx";
import Toast from "../../components/toast/Toast";
import ReactDOM from "react-dom";
import { SmallVioletButton } from "../../components/buttons/SmallVioletButton";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import skip from "../../image/skip2.png";
import { useLocation, useNavigate } from "react-router";
import {api} from "../../libs/utils/api"

export default function Quiz() {
  const [showToast, setShowToast] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10);
  const [toastMsg, setToastMsg] = useState("스스로 풀어보세요");
  const [timerCount, setTimerCount] = useState(0);

  const { state } = useLocation(); //리스트에서 누른 퀴즈의 정보 넘어옴
  const problemId = state.id;
  // const hints = api.get(`/hints/:${problemId}`)

  useEffect(() => {
    console.log("timerCount", timerCount);
  }, [timerCount]);

  const handleTimerStart = () => {
    //토스트 메시지 내용 설정 및 show
    if (timerCount === 0) {
      setShowToast(true);
    } else if (timerCount === 1) {
      setToastMsg("힌트 보며 풀어보세요");
      setShowToast(true);
    } else if (timerCount === 2) {
      setToastMsg("해설 시간을 가져보세요");
      setShowToast(true);
    }
  };

  const handleTimerComplete = () => {
    //끝났을 때 다음 타이머 duration 설정해야될듯? / 토스트 메시지 / timerCOunt
    if (timerCount === 0) {
      setToastMsg("스스로 푸는 시간 종료");
      setShowToast(true);
      setTimerCount((prev) => prev + 1); //이제 2
      setTimerDuration(5); //2단계 시간 설정 해줌
    } else if (timerCount === 1) {
      setToastMsg("힌트 풀이 시간 종료");
      setShowToast(true);
      setTimerCount((prev) => prev + 1); //이제 3
      setTimerDuration(4); //3단계 시간 설정 해줌
    } else if (timerCount === 2) {
      setToastMsg("해설 시간 종료");
      setShowToast(true);
    }
  };

  useEffect(() => {
    //타이머 머무는 시간 설정
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast]);

  const handleClickPass = () => {
    setTimerDuration(0);
  };

  const handleHintClick = () => {
    
  }

  return (
    <div className={styles.quizContainer}>
      <QuizNameContainer onClick={handleClickPass} quizInfo={state}/>
      <Timer
        initialMinutes={0}
        initialSeconds={timerDuration}
        onComplete={handleTimerComplete}
        onStart={handleTimerStart}
      />
      {showToast && <Toast message={toastMsg} />}
      <div className={styles.hintWrapper}>
        {
          hints.map(hint=>(
            <HintContainer
              hintTitle={maplevelToQuestion[hint.hintLevel]}
              hintContent={hint.hintContent}
              onClick={handleHintClick}
            />            
          ))
        }
      </div>

      <CommentContainer />
    </div>
  );
}

const QuizNameContainer = ({ onClick, quizInfo }) => {
  return (
    <div className={styles.quizNameContainer}>
      <div className={styles.quizInfo}>
        <div className={styles.quizTitle} ><a href={quizInfo.problemUrl}>{quizInfo.title}</a></div>
        <div className={styles.quizPersonal}>
          <div className={styles.bookmark}>
            <img src={bookmark} alt="찜" className={styles.bookmarkImage}></img>
            <div>찜</div>
          </div>
          <div className={styles.solved}>
            <img src={check} alt="품" className={styles.bookmarkImage}></img>
            <div>품</div>
          </div>
        </div>
      </div>
      <div className={styles.timer} onClick={onClick}>
        <img src={skip} alt="스킵" className={styles.skip}></img>
        <div>건너뛰기</div>
      </div>
    </div>
  );
};

const CommentContainer = () => {
  const commentRef = useRef(null);
  const buttonRef = useRef(null);
  const commentData = [
    {
      username: "유저1",
      userImg: "",
      comment: "bfs 기본문제네요. 개념을 잘 이해하시면 금방 풀어요",
    },
    { username: "유저 2", userImg: "", comment: "저는 보자마자 풀었네요" },
  ];
  return (
    <div className={styles.commentsContainer}>
      <p className={styles.commentTitle}>유저 코멘트</p>
      <div className={styles.commentList}>
        {commentData.map((data) => {
          return (
            <div className={styles.commentBox}>
              <div className={styles.userInfo}>
                <div className={styles.userImg}>
                  <img src={data.userImg} alt="프사" />
                </div>
                <p className={styles.userName}>{data.username}</p>
              </div>
              <div>{data.comment}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.commentInputContainer}>
        <textarea
          className={styles.commentInput}
          ref={commentRef}
          rows="4"
          placeholder="댓글을 입력해주세요"
        />
        <div className={styles.submitBtn}>
          <SmallVioletButton ref={buttonRef}>등록</SmallVioletButton>
        </div>
      </div>
    </div>
  );
};

const hints = [
  {
    id: 2,
    problemId: 1,
    hintContent: "1단계 힌트",
    hintLevel: "1",
    createdAt: "2023-06-11T18:55:37.000Z",
    updatedAt: "2023-06-11T18:55:37.000Z",
  },
  {
    id: 3,
    problemId: 2,
    hintContent: "2단계 힌트",
    hintLevel: "2",
    createdAt: "2023-06-11T19:07:53.000Z",
    updatedAt: "2023-06-11T19:07:53.000Z",
  },
  {
    id: 4,
    problemId: 3,
    hintContent: "3단계 힌트",
    hintLevel: "3",
    createdAt: "2023-06-11T19:08:06.000Z",
    updatedAt: "2023-06-11T19:08:06.000Z",
  },
  {
    id: 5,
    problemId: 4,
    hintContent: "4단계 힌트",
    hintLevel: "4",
    createdAt: "2023-06-11T19:08:06.000Z",
    updatedAt: "2023-06-11T19:08:06.000Z",
  },
];

const maplevelToQuestion = {
  1: "문제 유형은 무엇인가요?", 
  2: "세부 유형 또는 고려해야할 부분은 무엇일까요?",
  3: "필수적으로 사용해야하는 것은 무엇인가요?",
  4: "놓칠 수 있을만한 테스트 케이스는 무엇이 있을까요?",
}