import styles from './adminCreate.module.scss';
import HintContainer from "../../components/hintContainer/HintCotainer";
import { useRef, useState } from 'react';
import { SmallVioletButton } from '../../components/buttons/SmallVioletButton';
import AdminHintContainer from '../admin/adminHintContainer';
import { UserInput } from '../../components/inputs/UserInput';
import axios from 'axios';
import { Navigate } from 'react-router';

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
  
  // 입력값에 따라 문제정보에 저장될 정보가 달라짐.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizInfo(prev => ({
      ...prev,
      // category값이 문자열로 저장되어서 숫자로 변환하는 코드 삽입
      [name]: (name === "category" ? Number(value) : value),
    }));
  };
  console.log(quizInfo);
  // 문제 기본정보 등록 이벤트 핸들러
  const handleProblemCreate = async () => {
    try {
      const response = await axios.post('/problems', quizInfo)
      alert('기본 정보를 추가하였습니다.', response.data)
      console.log("🚀 ~ file: index.jsx:38 ~ handleProblemCreate ~ response.data:", response)
      
    } catch(error) {
      console.error('기본정보 등록 실패', error);}
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
            onChange={e => handleInputChange(e)}
            style={{borderRadius: "0.5rem", height: "50px", marginBottom: "10px"}}
          />
          <UserInput
            type="text"
            name="problemUrl"
            placeholder="문제 url"
            value={quizInfo.problemUrl}
            onChange={e => handleInputChange(e)}
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