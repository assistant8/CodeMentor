import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from "./Toast.module.scss"

const Toast = ({ message }) => {

  const content = (
    <div className={styles.toastMessage}>
      <div className={styles.toastContent}>{message}</div>
    </div>
  )

  //useRef 이용 방식은 좀 더 공부한 후에 수정하겠습니다
  return (
    ReactDOM.createPortal(content, document.getElementById("toast-container"))
  );

};

export default Toast;