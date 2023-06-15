import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: null,
    userName: "",
    email: "",
    image: null,
    grade: "",
    point: 0,
    createdAt: "",
    updatedAt: "",
    isEmailVerified: false,
    verificationCode: null,
  },
});
