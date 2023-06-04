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
}

export function returnEmailVericationMessage(email) {
  if (email === "") {
    return "이메일을 입력해주세요.";
  }

  if (!isEmailValid(email)) {
    return "이메일 형식이 유효하지 않습니다.";
  }

  return "완벽합니다!";
}

export function ReturnPasswordVericationMessage(password) {
  if (password === "") {
    return "비밀번호를 입력해주세요.";
  }

  if (!isEmailValid(password)) {
    return "비밀번호 형식이 유효하지 않습니다.";
  }

  return "완벽합니다!";
}

export function ReturnPasswordConfirmVericationMessage(
  password,
  passwordConfirm
) {
  if (passwordConfirm === "") {
    return "비밀번호를 입력해주세요.";
  }

  if (password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return "완벽합니다!";
}

function isPassVerication(FormInputValue) {
  const { email, password, passwordConfirm } = FormInputValue;

  if (email) {
  }

  if (
    isEmailValid(email) &&
    isPasswordValid(password) &&
    password === passwordConfirm
  ) {
    return true;
  }

  return false;
}
