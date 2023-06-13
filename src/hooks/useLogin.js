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

export function isVerificationCodeValid(verificationCode) {
  return verificationCode.length === 6;
}

export function isUserNameValid(userName) {
  if (userName === "") return false;

  const userNameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]{2,10}$/;
  const result = userNameRegex.test(userName);

  return result;
}

// 유효성 검사 메세지

const validationMessageWhenPass = "완벽합니다!";

export function makeEmailValidationMessage(email) {
  if (email === "") {
    return "이메일을 입력해주세요.";
  }

  if (!isEmailValid(email)) {
    return "이메일 형식이 유효하지 않습니다.";
  }

  return validationMessageWhenPass;
}

export function makePasswordValidationMessage(password) {
  if (password === "") {
    return "비밀번호를 입력해주세요.";
  }

  if (!isPasswordValid(password)) {
    return "비밀번호 형식이 유효하지 않습니다.";
  }

  return validationMessageWhenPass;
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

  return validationMessageWhenPass;
}

export function makeVerificationCodeVaildationMessage(verificationCode) {
  if (verificationCode === "") {
    return "인증 번호를 입력해주세요.";
  }

  if (!isVerificationCodeValid(verificationCode)) {
    return "인증 번호는 6자리 숫자입니다.";
  }

  return validationMessageWhenPass;
}

function makeUserNameValidationMessage(userName) {
  if (userName === "") {
    return "사용할 이름을 입력해주세요.";
  }

  if (!isUserNameValid(userName)) {
    return "유효하지 않은 이름입니다.";
  }

  return "완벽합니다!";
}

export function makeValidationMessage(inputName, inputValue) {
  switch (inputName) {
    case "email":
      return makeEmailValidationMessage(inputValue);
    case "password":
      return makePasswordValidationMessage(inputValue);
    case "verificationCode":
      return makeVerificationCodeVaildationMessage(inputValue);
    case "userName":
      return makeUserNameValidationMessage(inputValue);
  }
}

// submit 시 유효성 검사 한 번에 & 통과 못 하면 다음 코드 진행 X.
export function isPassValidation(formInputValue, validationMessage) {
  const { email, password, passwordConfirm, verificationCode, userName } =
    formInputValue;

  if ("email" in formInputValue && !isEmailValid(email)) {
    return false;
  }

  if (
    "verificationCode" in formInputValue &&
    !isVerificationCodeValid(verificationCode)
  ) {
    return false;
  }

  if ("password" in formInputValue && !isPasswordValid(password)) {
    return false;
  }

  if (
    "passwordConfirm" in formInputValue &&
    !isPasswordConfirmValid(password, passwordConfirm)
  ) {
    return false;
  }

  if ("userName" in formInputValue && !isUserNameValid(userName)) {
    return false;
  }

  return true;
}

// submit 시 유효성 검사 통과 못하면 경고창 띄우기.
export function alertValidationMessage(validationMessage, focusRef = null) {
  if (
    ("email" in validationMessage) &
    (validationMessage.email !== validationMessageWhenPass)
  ) {
    alert(validationMessage.email);

    if (focusRef !== null && focusRef?.email?.current) {
      focusRef.email.current.focus();
    }

    return;
  }

  if (
    ("verificationCode" in validationMessage) &
    (validationMessage.verificationCode !== validationMessageWhenPass)
  ) {
    alert(validationMessage.verificationCode);

    if (focusRef !== null && focusRef?.verificationCode?.current) {
      focusRef.verificationCode.current.focus();
    }

    return;
  }

  if (
    ("password" in validationMessage) &
    (validationMessage.password !== validationMessageWhenPass)
  ) {
    alert(validationMessage.password);

    if (focusRef !== null && focusRef?.password?.current) {
      focusRef.password.current.focus();
    }
  }

  if (
    ("passwordConfirm" in validationMessage) &
    (validationMessage.passwordConfirm !== validationMessageWhenPass)
  ) {
    alert(validationMessage.passwordConfirm);

    if (focusRef !== null && focusRef?.passwordConfirm?.current) {
      focusRef.passwordConfirm.current.focus();
    }

    return;
  }

  if (
    ("userName" in validationMessage) &
    (validationMessage.userName !== validationMessageWhenPass)
  ) {
    alert(validationMessage.userName);

    if (focusRef !== null && focusRef?.userName?.current) {
      focusRef.userName.current.focus();
    }

    return;
  }
}
