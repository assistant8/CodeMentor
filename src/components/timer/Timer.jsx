import React, { useState, useEffect, useMemo } from 'react';
import timer from "../../image/timer.png"
import styles from "./Timer.module.scss";

//사용자 정지 버튼도 생성해야 , 토스트 모달창도 수정해야 
const Timer = ({ initialMinutes, initialSeconds, onComplete, onStart }) => { //초기값
  const [minutes, setMinutes] = useState(initialMinutes); //현재값 업뎃 용도
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPause, setIsPause] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isAlive, setIsAlive] = useState(false); //0분0초 or 처음은 죽은걸로 간주, 일시정지는 true임

  useEffect(()=>{
    console.log("isAlive", isAlive)
    console.log("isPause", isPause)
    console.log("seconds", seconds)
  }, [isPause])

  useEffect(()=>{
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  }, [initialMinutes, initialSeconds])

  const handleTimerClick = () => { // 누르면 일시중지되거나 재생됨
    isPause ? setIsPause(false) : setIsPause(true); //일시정지 표시 
    if(!isAlive) {
      onStart();
      setIsAlive(true); //죽어있을 때(종료상태거나 처음) 터치하면 타이머 시작
    }
  }

  useEffect(() => {
    let totalSeconds = minutes * 60 + seconds;
    const interval = setInterval(() => {
      totalSeconds--;
      if (!isPause && isAlive && totalSeconds >= 0) {
        setMinutes(Math.floor(totalSeconds / 60));
        setSeconds(totalSeconds % 60);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, isPause, isAlive]); //m,s ?


  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      // 타이머가 0이 되었을 때 수행할 작업 - 부모에 끝났다고 말하고 부모에서 토스트 메시지 표출, 0:00에서 멈춰있도록 
      onComplete(); 
      setIsPause(true); //및 일시정지 표시 
      setIsAlive(false); //0:0 이면 죽었다 간주 
      console.log("끝")
    }
  }, [minutes, seconds]); //onComplete 넣으니까 3초에 한번 계속 불림

  const handleHover = () => {
    setIsHover(true)
  }
  const handleLeave = () => {
    setIsHover(false)
  }

  return (
    <div className={styles.timerContainer} onClick={handleTimerClick} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <img src={timer} className={styles.timerRing} alt="Timer" />
      <div className={`${isHover ? (!isPause ? styles.hoverPauseImage : styles.hoverPlayImage) : styles.timerString}`} >
        {isHover ? "" : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
      </div>
    </div>
  );
};

export default Timer;
