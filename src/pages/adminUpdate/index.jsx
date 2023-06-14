import styles from './adminUpdate.module.scss';
import HintContainer from "../../components/hintContainer/HintCotainer";
import { useRef, useState } from 'react';
import { SmallVioletButton } from '../../components/buttons/SmallVioletButton';
import { useLocation } from 'react-router-dom';

export default function ProblemUpdatePage() {
  const location = useLocation();
  // URL 매개변수에서 퀴즈 정보 추출
  const queryParams = new URLSearchParams(location.search);
  const quizId = queryParams.get('quizId');

  // problem reserved schema
  const dummyTest =  [
    {
      "id": 1,
      "category": 0,
      "title": "3085 사탕 게임 - 1",
      "problemUrl": "https://www.acmicpc.net/problem/3085",
      "difficulty": 3,
      "timer": 20,
      "hintContent": "1단계 힌트",
      "hintLevel": 1
    },
  ];
  // 변경할 문제 상태는 객체로 들어올 것임
  //   axios
  //     .get(apiUrl)
  //     .then(response => {
  //       console.log('업데이트 성공', response.data);
  //     })
  //     .catch(err => {
  //       console.log('업데이트 실패', err);
  //     });
  const [quizInfo, setQuizInfo] = useState(dummyTest[0]);

  const buttonRef = useRef();
  const handleProblemUpdate = () => {
    // // 위 입력된 데이터들을 데이터베이스의 problem에 추가시켜야 함
    // const apiUrl = `api/problems/${quizId}`;

  //   axios
  //     .put(apiUrl, quizInfo)
  //     .then(response => {
  //       console.log('업데이트 성공', response.data);
  //     })
  //     .catch(err => {
  //       console.log('업데이트 실패', err);
  //     });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className='styles.container'>
      <div className="styles.QuizInfo">
        <h2>문제 정보</h2>
        <input type="text" name='title' placeholder='문제 이름' value={quizInfo.title} onChange={handleInputChange} />
        <input type="text" name='problemUrl' placeholder='문제 url' value={quizInfo.problemUrl} onChange={handleInputChange} />
        <div className='category'>
          <button type="button" value="백준" onClick={()=>setQuizInfo({...quizInfo, category: 0})}>백준</button> 
          <button type="button" value="프로그래머스" onClick={()=>setQuizInfo({...quizInfo, category: 1})}>프로그래머스</button> 
        </div>
      </div>
      <div className="hint">
        <h2>힌트 정보</h2>
        <HintContainer
          hintTitle={"힌트 1"}
          hintLevel={1}
          hintContent={""}
          isAdmin={true}
        />
        <SmallVioletButton 
          ref={buttonRef} 
          onClick={handleProblemUpdate}
          children="기본 수정"
          />
        <HintContainer
          hintTitle={"힌트 2"}
          hintLevel={2}
          hintContent={""}
          isAdmin={true}
        />
        <HintContainer
          hintTitle={"힌트 3"}
          hintLevel={3}
          hintContent={""}
          isAdmin={true}
        />
        <HintContainer
          hintTitle={"힌트 4"}
          hintLevel={4}
          hintContent={""}
          isAdmin={true}
        />
        <SmallVioletButton 
          ref={buttonRef} 
          onClick={handleProblemUpdate}
          children="추가 수정"
          />
      </div>
    </div>
  );
}