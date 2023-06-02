import styles from "./CreateProfile.module.scss";

export default function CreateProfile() {
  return (
    <div className={styles.container}>
      <div>* 회원 가입 후 최초 프로필 설정 페이지 *</div>
      <div>내 정보</div>
      <form>
        <div>사진</div>
        <input type="file" />
        <label htmlFor="nameInput"></label>
        <input
          type="text"
          name="name"
          id="nameInput"
          placeholder="사용하실 이름을 입력해주세요."
        />
        <div>이름 형식 평가 메세지</div>
        <input type="submit" value="시작하기" />
      </form>
    </div>
  );
}
