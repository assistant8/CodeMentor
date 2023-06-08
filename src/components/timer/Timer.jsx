import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes, initialSeconds, onClick, onComplete }) => { //초기값
  const [minutes, setMinutes] = useState(initialMinutes); //현재값 업뎃 용도
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const totalSeconds = minutes * 60 + seconds;

    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        setMinutes(Math.floor(totalSeconds / 60));
        setSeconds(totalSeconds % 60);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      // 타이머가 0이 되었을 때 수행할 작업을 여기에 추가하세요.
      // 예를 들어, 알림 메시지를 표시하거나 다른 함수를 호출할 수 있습니다.
    }
  }, [minutes, seconds]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>
    </div>
  );
};

export default Timer;
