import HintContainer from "../../components/hintContainer/HintCotainer";
import styles from "./Quiz.module.scss";
import { useEffect, useState, useRef } from "react";
import Timer from "../../components/timer/Timer.jsx";
import Toast from "../../components/toast/Toast";
import ReactDOM from "react-dom";
import { SmallVioletButton } from "../../components/buttons/SmallVioletButton";

import skip from "../../image/skip2.png";
import { useLocation, useNavigate } from "react-router";
import { api } from "../../libs/utils/api";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import bookmark from "../../image/bookmark.svg";
import check from "../../image/check.svg";

export default function Quiz() {
  const [showToast, setShowToast] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10);
  const [toastMsg, setToastMsg] = useState("스스로 풀어보세요");
  const [timerCount, setTimerCount] = useState(0);
  const [hints, setHints] = useState([]);

  const { state } = useLocation(); //리스트에서 누른 퀴즈의 정보 넘어옴
  const problemId = state.id;
  console.log("problemId", problemId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/hints/${problemId}`);
        console.log("res", res);
        setHints(res.data);
      } catch (error) {
        // 에러 처리 로직 추가
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, []);
  console.log(hints);

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

  return (
    <div className={styles.quizContainer}>
      <QuizNameContainer onClick={handleClickPass} quizInfo={state} />
      <Timer
        initialMinutes={0}
        initialSeconds={timerDuration}
        onComplete={handleTimerComplete}
        onStart={handleTimerStart}
      />
      {showToast && <Toast message={toastMsg} />}
      <div className={styles.hintWrapper}>
        {hints.map((hint) => (
          <HintContainer
            hintTitle={maplevelToQuestion[hint.hintLevel]}
            hintContent={hint.hintContent}
          />
        ))}
      </div>

      <CommentContainer />
    </div>
  );
}

const QuizNameContainer = ({ onClick, quizInfo }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const userEmail = useRecoilValue(userState).email;
  console.log("userEmail", userEmail);

  const addBookmark = async () => {
    try {
      const response = await api.post(
        `/user-problem/saved/?email=${userEmail}&problemId=${quizInfo.id}`
      );
      console.log(response.data);
      setIsBookmarked(true);
    } catch (error) {
      console.log("error", error);
      setIsBookmarked(true);
    }
  };

  const removeBookmark = async () => {
    try {
      const response = await api.delete(
        `/user-problem/saved/?email=${userEmail}&problemId=${quizInfo.id}`,
        { email: { userEmail } }
      );
      console.log(response.data); // 성공적으로 요청을 처리한 후의 응답 데이터
      setIsBookmarked(false); // 찜 버튼 상태를 업데이트
    } catch (error) {
      console.log("error", error); // 에러 처리
      setIsBookmarked(false); // 찜 버튼 상태를 업데이트
    }
  };

  const addSolved = async () => {
    try {
      const response = await api.post(
        `/user-problem/solved/?email=${userEmail}&problemId=${quizInfo.id}`,
        { email: { userEmail } }
      );
      console.log(response.data);
      setIsSolved(true);
    } catch (error) {
      console.log("error", error);
      setIsSolved(true);
    }
  };

  const removeSolved = async () => {
    try {
      const response = await api.delete(
        `/user-problem/solved/?email=${userEmail}&problemId=${quizInfo.id}`,
        { email: { userEmail } }
      );
      console.log(response.data); // 성공적으로 요청을 처리한 후의 응답 데이터
      setIsSolved(false); // 찜 버튼 상태를 업데이트
    } catch (error) {
      console.log("error", error); // 에러 처리
      setIsSolved(false); // 찜 버튼 상태를 업데이트
    }
  };

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark();
    } else {
      addBookmark();
    }
  };

  const handleSolveClick = () => {
    if (isSolved) {
      removeSolved();
    } else {
      addSolved();
    }
  };

  const toggleBookmarkStyle = {
    fill: isBookmarked ? "limegreen" : "#DCDCDC",
  };

  const toggleSolveStyle = {
    fill: isSolved ? "limegreen" : "#DCDCDC",
  };

  return (
    <div className={styles.quizNameContainer}>
      <div className={styles.quizInfo}>
        <div className={styles.quizTitle}>
          <a href={quizInfo.problemUrl}>{quizInfo.title}</a>
        </div>
        <div className={styles.quizPersonal}>
          <div className={styles.bookmark} onClick={handleBookmarkClick}>
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 43 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.375 0.333313H38.125C39.3848 0.333313 40.593 0.824978 41.4838 1.70015C42.3746 2.57532 42.875 3.7623 42.875 4.99998V42.3333L38.125 40.3033V4.99998H9.625C9.625 3.7623 10.1254 2.57532 11.0162 1.70015C11.907 0.824978 13.1152 0.333313 14.375 0.333313ZM28.625 44.6666V14.3333H4.875V44.6666L16.75 39.58L28.625 44.6666ZM28.625 9.66665C31.2612 9.66665 33.375 11.7666 33.375 14.3333V51.6666L16.75 44.6666L0.125 51.6666V14.3333C0.125 13.0956 0.625445 11.9087 1.51624 11.0335C2.40704 10.1583 3.61522 9.66665 4.875 9.66665H28.625Z"
                fill={toggleBookmarkStyle.fill}
              />
            </svg>
            <div>찜</div>
          </div>
          <div className={styles.solved} onClick={handleSolveClick}>
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 57 49"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.4318 48.2433C19.0379 48.6555 18.3796 48.6555 17.9857 48.2433L0.660044 30.1097C0.290749 29.7232 0.290748 29.1146 0.660044 28.7281L7.8018 21.2534C8.19608 20.8407 8.85521 20.8412 9.24888 21.2544L17.9854 30.4254C18.3792 30.8388 19.0386 30.8391 19.4329 30.4261L47.7511 0.757486C48.1449 0.344901 48.8035 0.344737 49.1975 0.757123L56.34 8.2326C56.7093 8.61912 56.7093 9.22773 56.34 9.61424L19.4318 48.2433Z"
                fill={toggleSolveStyle.fill}
              />
            </svg>
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

const hintss = [
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
};
