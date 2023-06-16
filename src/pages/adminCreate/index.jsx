import styles from './adminCreate.module.scss';
import HintContainer from "../../components/hintContainer/HintCotainer";
import { SmallVioletButton } from '../../components/buttons/SmallVioletButton';
import { useRef } from 'react';

export default function ProblemCreatePage() {

  const buttonRef = useRef();
  const handleProblemCreate = () => {
    // 위 입력된 데이터들을 데이터베이스의 problem에 추가시켜야 함
  }

  return (
    <div className='styles.adminCreate__wrapper'>
      <div className="styles.adminCreate__problemContainer">
        <h2>문제 정보</h2>
        <div className='styles.problemInfo'>
          <input type="text" placeholder='문제 이름' />
          <input type="text" placeholder='문제 url' />
        </div>
        <div className='styles.category'>
          {/* 카테고리 컴포넌트버튼 만들자 */}
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
      <SmallVioletButton 
        ref={buttonRef} 
        onClick={handleProblemCreate}
        children="등록"
        />
    </div>
  );
}