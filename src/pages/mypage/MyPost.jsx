import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";

const MyPost = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(()=>{
    setHeaderTitle("내가 작성한 글")
  }, [setHeaderTitle]);

  return <div>내가 쓴 글 페이지임</div>;
};
export default MyPost;
