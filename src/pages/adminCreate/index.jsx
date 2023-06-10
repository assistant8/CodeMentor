import { headerTitleState } from '../../state/headerTitleState';
import { useSetRecoilState } from 'recoil';

import HintContainer from "../../components/hintContainer/HintCotainer";

export default function ProblemCreatePage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  // useEffect를 굳이 사용하지 않아도 setHeaderTitle만 변경해도 useEffect가 자동으로 적용되는 듯??
  // 다른분들은 useEffect(()=>{set~~("")},[set~])로 설정하시던데 그 이유는 무엇인지 궁금
  
  // 와이어프레임에는 수정 및 등록으로 되어 있으나,
  // 등록만 하는 경우는 get요청이 필요없어서 따로 두는 것이 최적화에 도움이 될 듯함
  // setHeaderTitle은 Header 컴포넌트에 있는 것인데 Outlet 컴포넌트에서 하는 게 맞는가?
  setHeaderTitle('문제 등록');

    const handleProblemCreate = () => {
      // 위 입력된 데이터들을 데이터베이스의 problem에 추가시켜야 함
    }

  return (
    <>
      <div className="problemInfo">
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
      <button type='submit' onClick={handleProblemCreate} >등록</button>
    </>
  );
}