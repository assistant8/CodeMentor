import { headerTitleState } from '../../state/headerTitleState';
import { useSetRecoilState } from 'recoil';

export default function ProblemUpdatePage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  // useEffect를 굳이 사용하지 않아도 setHeaderTitle만 변경해도 useEffect가 자동으로 적용되는 듯??
  // 다른분들은 useEffect(()=>{set~~("")},[set~])로 설정하시던데 그 이유는 무엇인지 궁금
  
  // 와이어프레임에는 수정 및 등록으로 되어 있으나,
  // 등록만 하는 경우는 get요청이 필요없어서 따로 두는 것이 최적화에 도움이 될 듯함
  setHeaderTitle('문제 수정');

  return (
    <>

    </>
  );
}