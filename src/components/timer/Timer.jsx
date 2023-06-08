import React, { useState, useEffect } from 'react';
import timer from "../../image/timer.png"

const Timer = ({ initialMinutes, initialSeconds, onComplete }) => { //초기값
  const [minutes, setMinutes] = useState(initialMinutes); //현재값 업뎃 용도
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPause, setIsPause] = useState(false);

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
  }, [minutes, seconds]);


  return (
    <div onClick={handleTimerClick} style={{backgroundColor: 'yellow'}}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img src={timer} style={{ width: '100%' }} alt="Timer" />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </div>
      </div>
    </div>
  );
};

export default Timer;
