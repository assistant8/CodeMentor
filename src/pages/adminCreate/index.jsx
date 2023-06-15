import styles from './adminCreate.module.scss';
import HintContainer from "../../components/hintContainer/HintCotainer";
import { useRef, useState } from 'react';
import { SmallVioletButton } from '../../components/buttons/SmallVioletButton';
import AdminHintContainer from '../admin/adminHintContainer';
import { UserInput } from '../../components/inputs/UserInput';

export default function ProblemUpdatePage() {

  // problem reserved schema
  // const dummyTest = {
  //     "id": 1,
  //     "category": 0,
  //     "title": "3085 사탕 게임 - 1",
  //     "problemUrl": "https://www.acmicpc.net/problem/3085",
  //     "difficulty": 3,
  //     "timer": 20,
  //     "hintContent": "1단계 힌트",
  //     "hintLevel": 1
  //   }

  // 문제정보를 받을 상태와 입력시 상태를 변경할 set함수를 빈 객체를 초기값으로 설정
  const [quizInfo, setQuizInfo] = useState({hintLevel: 1});
  console.log("🚀 ~ file: index.jsx:26 ~ ProblemUpdatePage ~ quizInfo:", quizInfo)

  const buttonRef = useRef();
  // 문제 기본정보 등록 이벤트 핸들러
  const handleProblemCreate = () => {
    // // 아래 입력된 데이터들을 데이터베이스의 problem에 추가시켜야 함
  //   axios
  //     .post('/api/problems', quizInfo)
  //     .then(response => {
  //       console.log('업데이트 성공', response.data);
  //     })
  //     .catch(err => {
  //       console.log('업데이트 실패', err);
  //     });
  };

  // 입력값에 따라 문제정보에 저장될 정보가 달라짐.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 추가 힌트 등록 이벤트 핸들러
  const handleHintCreate = () => {};

  
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.QuizInfo}>
        <h3>문제 정보</h3>
          <UserInput
            type="text"
            name="title"
            placeholder="문제이름"
            value={quizInfo.title}
            onChange={handleInputChange}
            style={{borderRadius: "0.5rem", height: "50px", marginBottom: "10px"}}
          />
          <UserInput
            type="text"
            name="problemUrl"
            placeholder="문제 url"
            value={quizInfo.problemUrl}
            onChange={handleInputChange}
            style={{borderRadius: "0.5rem", height: "50px", marginBottom: "10px"}}
          />
          <div className={styles.category}>
            <button name="category" type="button" value={0} onClick={handleInputChange}>백준</button> 
            <button name="category" type="button" value={1} onClick={handleInputChange}>프로그래머스</button> 
          </div>
        </div>
      </div>
      <div className={styles.hintContainer}>
        <h3>힌트 정보</h3>
        <AdminHintContainer
          hintLevel={1}
          hintContent={quizInfo.hintContent}
          onChange={(e)=>{setQuizInfo({...quizInfo, hintContent: e.target.value})}}
        />
        <div className={styles.submitBtn}>
          <SmallVioletButton 
            ref={buttonRef} 
            onClick={handleProblemCreate}
            children="기본 등록"
            />
        </div>
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
        <div className={styles.submitBtn}>
          <SmallVioletButton 
            ref={buttonRef} 
            onClick={handleHintCreate}
            children="추가 등록"
            />
        </div>
      </div>
    </div>
  );
}