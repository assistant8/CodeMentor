import { atom } from "recoil";

export const categoryState = atom({
  key: "categoryState",
  default: "전체",
});

export const searchKeyState = atom({
  key: "searchKeyState",
  default: "",
});
