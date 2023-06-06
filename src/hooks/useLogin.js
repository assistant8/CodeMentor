import axios from "axios";

// 유효성 검사
export function isEmailValid(email) {
  if (email === "") return false;

  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const result = emailRegExp.test(email);

  return result;
}

export function isPasswordValid(password) {
  if (password === "") return false;

  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
  const result = passwordRegExp.test(password);

  return result;
}

export function isPasswordConfirmValid(password, passwordConfirm) {
  if (passwordConfirm === "") return false;

  if (password !== passwordConfirm) return false;

  return true;
}

// 유효성 검사 메세지
export function makeEmailValidationMessage(email) {
  if (email === "") {
    return "이메일을 입력해주세요.";
  }

  if (!isEmailValid(email)) {
    return "이메일 형식이 유효하지 않습니다.";
  }

  return "";
}

export function makePasswordValidationMessage(password) {
  if (password === "") {
    return "비밀번호를 입력해주세요.";
  }

  if (!isPasswordValid(password)) {
    return "비밀번호 형식이 유효하지 않습니다.";
  }

  return "";
}

export function makePasswordConfirmValidationMessage(
  password,
  passwordConfirm
) {
  if (passwordConfirm === "") {
    return "비밀번호를 재확인해주세요.";
  }

  if (password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return "";
}

// submit 시 유효성 검사 한 번에 & 통과 못 하면 다음 코드 진행 X.
export function isPassValidation(formInputValue, validationMessage) {
  const { email, password, passwordConfirm } = formInputValue;

  console.log(email, password, passwordConfirm);

  if ("email" in formInputValue && !isEmailValid(email)) {
    return false;
  }

  if (formInputValue.hasOwnProperty("password") && !isPasswordValid(password)) {
    return false;
  }

  if (
    "passwordConfirm" in formInputValue &&
    !isPasswordConfirmValid(password, passwordConfirm)
  ) {
    return false;
  }

  return true;
}

// submit 시 유효성 검사 통과 못하면 경고창 띄우기.
export function alertValidationMessage(validationMessage, focusRef = null) {
  if (validationMessage.email) {
    alert(validationMessage.email);

    if (focusRef !== null && focusRef?.email?.current) {
      focusRef.email.current.focus();
    }

    return;
  }

  if (validationMessage.password) {
    alert(validationMessage.password);

    if (focusRef !== null && focusRef?.password?.current) {
      focusRef.password.current.focus();
    }

    return;
  }

  if (validationMessage.passwordConfirm) {
    alert(validationMessage.passwordConfirm);

    if (focusRef !== null && focusRef?.passwordConfirm?.current) {
      focusRef.passwordConfirm.current.focus();
    }

    return;
  }

  // alert(
  //   validationMessage.email ||
  //     validationMessage.password ||
  //     validationMessage.passwordConfirm
  // );
}

export function axiosInterceptors() {
  axios.interceptors.request.use(
    (config) => {
      console.log("요청 인터셉터: ", config.url, config.data);

      return config;
    },
    function (error) {
      console.error("요청 에러: ", error);

      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log("응답 인터셉터: ", response.status, response.data);
      return response;
    },
    (error) => {
      console.error("응답 에러: ", error);

      return Promise.reject(error);
    }
  );
}

// 형식 검사 & 경고창 띄우기 한 번에.
// export function checkValidationAndAlertValidationMessage(
//   formInputValue,
//   validationMessage
// ) {
//   function isEmailValid(email) {
//     if (email === "") return false;

//     const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     const result = emailRegExp.test(email);

//     return result;
//   }

//   function isPasswordValid(password) {
//     if (password === "") return false;

//     const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
//     const result = passwordRegExp.test(password);

//     return result;
//   }

//   function isPasswordConfirmValid(password, passwordConfirm) {
//     if (passwordConfirm === "") return false;

//     if (password !== passwordConfirm) return false;

//     return true;
//   }

//   function isPassValidation(formInputValue, validationMessage) {
//     if (!isEmailValid(email)) {
//       alert(validationMessage.email);
//       return false;
//     }

//     if (!isPasswordValid(password)) {
//       console.log(1);
//       alert(validationMessage.password);
//       return false;
//     }

//     if (!isPasswordConfirmValid(password, passwordConfirm)) {
//       alert(validationMessage.passwordConfirm);
//       return false;
//     }

//     return true;
//   }
//   const { email, password, passwordConfirm } = formInputValue;

//   return isPassValidation(formInputValue, validationMessage);
// }
