import styles from './adminCreate.module.scss';
import HintContainer from "../../components/hintContainer/HintCotainer";
import { useRef, useState } from 'react';
import { SmallVioletButton } from '../../components/buttons/SmallVioletButton';
import AdminHintContainer from '../admin/adminHintContainer';
import { UserInput } from '../../components/inputs/UserInput';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ProblemUpdatePage() {
  const navigate = useNavigate();
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
    const [quizInfo, setQuizInfo] = useState({
      title: '',
      problemUrl: '',
      category: 0,
    hintLevel: 1,
    hintContent: '',
    difficulty: 1,
    timer: 5,
  });
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
  const handleProblemCreate = async () => {
    try {
      const response = await axios.post('/problems', quizInfo)
      alert('기본 정보를 추가하였습니다\n추가 힌트정보를 등록하여주세요.')
      setSecondHint((prevHint) => ({
        ...prevHint,
        problemId: response.data.problemId,
      }));
      setThirdHint((prevHint) => ({
        ...prevHint,
        problemId: response.data.problemId,
      }));
      setFourthHint((prevHint) => ({
        ...prevHint,
        problemId: response.data.problemId,
      }));
    } catch(error) {
      console.error('기본정보 등록 실패', error);}
    };

    // 힌트 2, 3, 4 
    const [secondHint, setSecondHint] = useState({
      hintLevel: 2,
      hintContent: "",
    })
    console.log("🚀 ~ file: index.jsx:67 ~ ProblemUpdatePage ~ secondHint:", secondHint)
    const [thirdHint, setThirdHint] = useState({
      hintLevel: 3,
      hintContent: "",
    })
    console.log("🚀 ~ file: index.jsx:73 ~ ProblemUpdatePage ~ thirdHint:", thirdHint)
    const [fourthHint, setFourthHint] = useState({
      hintLevel: 4,
      hintContent: "",
    })
    console.log("🚀 ~ file: index.jsx:79 ~ ProblemUpdatePage ~ fourthHint:", fourthHint)
    
    // 추가 힌트 등록 이벤트 핸들러
    const handleHintCreate = async (nthHint) => {
      try {
        const response = await axios.post('/hints', nthHint)
        alert(`힌트 ${nthHint.hintLevel} 를 등록하였습니다.`)
        nthHint === fourthHint && navigate('/admin');
      } catch(error) {
        console.error(`힌트 ${nthHint.hintLevel} 등록 실패.`, error);
      }
    };
  
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
          showImage={false}
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
        <AdminHintContainer
          hintLevel={2}
          hintContent={secondHint.hintContent}
          onChange={(e)=>{setSecondHint({...secondHint, hintContent: e.target.value})}}
          onClick={() => {handleHintCreate(secondHint)}}
        />
        <AdminHintContainer
          hintLevel={3}
          hintContent={thirdHint.hintContent}
          onChange={(e)=>{setThirdHint({...thirdHint, hintContent: e.target.value})}}
          onClick={() => {handleHintCreate(thirdHint)}}
        />
        <AdminHintContainer
          hintLevel={4}
          hintContent={fourthHint.hintContent}
          onChange={(e)=>{setFourthHint({...fourthHint, hintContent: e.target.value})}}
          onClick={() => {handleHintCreate(fourthHint)}}
        />
      </div>
    </div>
  );
}