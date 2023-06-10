import styles from './adminUpdate.module.scss';
import HintContainer from "../../components/hintContainer/HintCotainer";

export default function ProblemUpdatePage() {
  const handleProblemUpdate = () => {
    // 위 입력된 데이터들을 데이터베이스의 problem에 추가시켜야 함
  }

  return (
    <div className='styles.container'>
      <div className="styles.problemInfo">
        <h2>문제 정보</h2>
        <input type="text" placeholder='문제 이름' />
        <input type="text" placeholder='문제 url' />
        <div className='category'>
          <button type="button" value="백준" onClick={()=>{}}>백준</button> 
          <button type="button" value="프로그래머스" onClick={()=>{}}>프로그래머스</button> 
        </div>
      </div>
      <div className="hint">
        <h2>힌트 정보</h2>
        <HintContainer
          hintTitle={"힌트 1"}
          hintContent={""}
          isAdmin={true}
        />
        <HintContainer
          hintTitle={"힌트 2"}
          hintContent={""}
          isAdmin={true}
        />
        <HintContainer
          hintTitle={"힌트 3"}
          hintContent={""}
          isAdmin={true}
        />
        <HintContainer
          hintTitle={"힌트 4"}
          hintContent={""}
          isAdmin={true}
        />
      </div>
      <button type='submit' onClick={handleProblemUpdate} >등록</button>
    </div>
  );
}