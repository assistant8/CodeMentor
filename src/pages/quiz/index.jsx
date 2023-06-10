import HintContainer from "../../components/hintContainer/HintCotainer";
import styles from "./Quiz.module.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect, useState, useRef } from "react";
import Timer from "../../components/timer/Timer.jsx";
import Toast from "../../components/toast/Toast";
import ReactDOM from 'react-dom';
import { SmallVioletButton } from "../../components/buttons/SmallVioletButton";
import bookmark from "../../image/bookmark.png"
import check from "../../image/check.png"
import skip from "../../image/skip2.png"



export default function Quiz() {
  const [showToast, setShowToast] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10);
  const [toastMsg, setToastMsg] = useState("스스로 풀어보세요")
  const [timerCount, setTimerCount] = useState(0)

  useEffect(()=>{
    console.log("timerCount", timerCount)
  }, [timerCount])
  
  const handleTimerStart = () => { //토스트 메시지 내용 설정 및 show
    if(timerCount===0) {
      setShowToast(true);
    } else if(timerCount===1) {
      setToastMsg("힌트 보며 풀어보세요")
      setShowToast(true);
    } else if(timerCount===2) {
      setToastMsg("해설 시간을 가져보세요")
      setShowToast(true);
    }
  }

  const handleTimerComplete = () => { //끝났을 때 다음 타이머 duration 설정해야될듯? / 토스트 메시지 / timerCOunt
    if(timerCount===0) {
      setToastMsg("스스로 푸는 시간 종료")
      setShowToast(true);
      setTimerCount((prev)=>prev+1) //이제 2
      setTimerDuration(5) //2단계 시간 설정 해줌
    } else if(timerCount===1) {
      setToastMsg("힌트 풀이 시간 종료")
      setShowToast(true);
      setTimerCount((prev)=>prev+1) //이제 3
      setTimerDuration(4) //3단계 시간 설정 해줌
    } else if(timerCount===2) {
      setToastMsg("해설 시간 종료")
      setShowToast(true);
    }
  };

  useEffect(() => { //타이머 머무는 시간 설정 
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast]);

  const handleClickPass = () => {
    setTimerDuration(0)
  }


  return (
    <div className={styles.quizContainer}>
      <QuizNameContainer onClick={handleClickPass} />
      <Timer initialMinutes={0} initialSeconds={timerDuration} onComplete={handleTimerComplete} onStart={handleTimerStart}/>
      {showToast && <Toast message={toastMsg} />}
      <HintContainer
        hintTitle={"힌트 1"}
        hintContent={"풀어줘요"}
        isOpen={true}
      />
      <HintContainer
        hintTitle={"힌트 2"}
        hintContent={"여기는무슨힌트가숨겨져이씅ㄹ까?"}
      />
      <HintContainer
        hintTitle={"힌트 3"}
        hintContent={"컴포넌트 테스트용"}
        isAdmin={true}
      />
      <CommentContainer />
    </div>
  );
}


const QuizNameContainer = ({onClick, title}) => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("문제");
  }, [setHeaderTitle]);

  return (
    <div className={styles.quizNameContainer}>
      <div className={styles.quizInfo}>
        <div className={styles.quizTitle}>문제제목</div>
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
