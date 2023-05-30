import "./Main.scss";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <>
      <div>로고</div>
      <div
        onClick={() => {
          console.log("구글");
        }}
      >
        구글 계정으로 로그인
      </div>
      <div
        onClick={() => {
          console.log("네이버");
        }}
      >
        네이버 계정으로 로그인
      </div>
      <div
        onClick={() => {
          console.log("카카오");
        }}
      >
        카카오 계정으로 로그인
      </div>
      <Link to="#">
        <div>이메일로 로그인</div>
      </Link>
    </>
  );
}
