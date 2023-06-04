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

export function isPassValidation(formInputValue, validationMessage) {
  const { email, password, passwordConfirm } = formInputValue;

  if (!isEmailValid(email)) {
    return false;
  }

  if (!isPasswordValid(password)) {
    return false;
  }

  if (!isPasswordConfirmValid(password, passwordConfirm)) {
    return false;
  }

  return true;
}

export function alertValidationMessage(validationMessage) {
  alert(
    validationMessage.email ||
      validationMessage.password ||
      validationMessage.passwordConfirm
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
