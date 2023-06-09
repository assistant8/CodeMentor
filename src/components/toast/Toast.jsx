import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Toast = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true); //불리는 순간 true로 설정해서 일단 띄워짐

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); //일정 시간 지나게되면 안보이게 설정
    }, 10000);

    return () => clearTimeout(timer); //타이머 클리어
  }, []);

  return (
    <div className={`toast-message ${isVisible ? 'visible' : ''}`}>
      <div className="toast-content">{message}</div>
    </div>
  );
    
};

export default Toast;