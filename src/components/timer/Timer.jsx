import React, { useState, useEffect } from 'react';
import timer from "../../image/timer.png"
import styles from "./Timer.module.scss";


const Timer = ({ initialMinutes, initialSeconds, onComplete }) => { //초기값
  const [minutes, setMinutes] = useState(initialMinutes); //현재값 업뎃 용도
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPause, setIsPause] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleTimerClick = () => { // 누르면 일시중지되거나 재생됨
    isPause ? setIsPause(false) : setIsPause(true); //일시정지 표시 
    console.log(isPause)
  }

  useEffect(() => {
    let totalSeconds = minutes * 60 + seconds;

    const interval = setInterval(() => {
      totalSeconds--;
      if (!isPause && totalSeconds >= 0) {
        setMinutes(Math.floor(totalSeconds / 60));
        setSeconds(totalSeconds % 60);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, isPause]); //m,s ?


  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      // 타이머가 0이 되었을 때 수행할 작업 - 부모에 끝났다고 말하고 부모에서 토스트 메시지 표출, 0:00에서 멈춰있도록 
      onComplete(); 
      setIsPause(true); //및 일시정지 표시 
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
