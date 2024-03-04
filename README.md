
<p align="center">
    <img src=https://github.com/assistant8/CodeMentor/assets/101612514/19439021-16a4-4481-99ef-04dac79b1d76" alt="codementor-logo" width="450px">
  
</p>

<div align="center">

  🏫 코딩테스트 준비를 위한 서비스, 코드멘토 <br>
  <p>23.05 ~ 23.06</p>

</div>
<br/>

<div align="center">

</div>
<br/>

## 💻 About CodeMentor

### 👶코딩테스트 문제를 풀다보면 안풀리는 문제가 있을 때 전체 해설을 보는 것이 아닌 어느정도의 방향만 알고싶을 때가 있습니다. <br />
<blockquote>
    ❓구글링해서 블로그로 찾거나 백준-프로그래머스 질문하기 게시판을 이용하면 되지 않나요? <br /><br />
    ⚠️개개인이 쓴 글이기 때문에 로직을 100% 신뢰할 수 없으며 정리되지 않고 중복된 내용인 경우가 많아요. <br /><br />
    ⚠️제목만 보고 게시글을 들어갔다가 전체 코드 또는 모든 힌트에 노출되기 마련이예요. <br />
</blockquote>
<br />

### 💁저희는 이러한 문제와 관련해 다음과 같은 생각을 했습니다. <br />
<blockquote>
    👉안풀린다고 답답해서 무작정 답을 봐버리는 경우가 있는데, 답을 보고 이해한다 하더라도 내가 조금씩이라도 힌트를 보며 직접 푸는 것이 훨씬 기억에 남고 실력 향상에 도움이 된다. <br /><br />
    👉문제를 풀 때, 특히 어려운 문제의 경우 긴 시간 풀어야하니 집중력이 떨어지는 경우가 있다. 따로 직접 타이머를 켜지 않더라도 지정한 시간에 푸는 연습을 하도록 타이머가 지정되면 좋을 것이다. <br />
</blockquote>
<br />

### ❗이러한 요구사항을 충족하기 위해 다음과 같은 메인기능을 두었습니다.<br />

#### 📙 문제별 힌트 <br />
   사용자가 최소한의 힌트만을 보고 문제를 풀어나갈 수 있도록 가장 큰 틀의 힌트 순으로 제시합니다.
   1) 문제 유형
   2) 문제 세부 유형 (알고리즘) 및 고려사항
   3) 해결을 위한 순차적 로직 과정
   4) 놓칠만한 테스트 케이스 <br />
   - 현재는 다음과 같은 단계로 제공되고 있으며, 차후 `해당 알고리즘에 대한 수도코드`, `해당 문제에서의 시간복잡도` 등과 같은 힌트 제공도 논의중에 있습니다. <br />

#### ⏰ 문제별 타이머 <br />
  사용자가 코딩테스트를 풀며 지정해놓은 시간에 해야하는 액션을 제시합니다.
  1) 힌트를 보지 않고 사용자가 충분히 고민하며 풀어보는 시간
  2) 힌트를 하나씩 열람하여 참고하며 풀어보는 시간
  3) 정답이나 다른 사람들의 풀이를 보며 반성하고 돌이켜보는 해설 시간, 자신의 것으로 만드는 시간 <br />
  - 타이머는 다음과 같은 3단계로 제공되고 있으며, 추가적으로 일시정지 및 시간 안에 해결 시 해당 단계 건너뛰기 기능을 제공합니다. <br /><br/>

## 💻 Service

<table>
<tr >
<td align="center">
문제 리스트
</td>
</tr>
<tr>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/e7c372f9-497e-4ccf-8bce-dc90082920af' width="300px">
    </td>
</tr>
</table>

> 문제 목록을 볼 수 있는 페이지로, 대표적인 플랫폼 카테고리를 통해 필터링 할 수 있으며, 특정 문제 제목으로 검색할 수 있습니다. 또한 자신이 풀거나 찜한 문제를 볼 수 있습니다. 
<br/>
<br/>

<table>
<tr >
<td align="center">
문제 상세 페이지 (찜, 완료)
</td>
<td align="center">
문제 상세 페이지 (타이머)
</td>
</tr>
<tr>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/9b77dd37-f4e3-405b-a370-148eba3090d7' width="300px">
    </td>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/64107097-ed30-4389-b167-21e0a8b03480' width="300px">
    </td>
</tr>
</table>

> 각 문제에 찜하거나 풀었다는 표시를 할 수 있으며 각각 찜한 리스트와 풀었던 리스트에서 확인 가능합니다.

> 각 문제에 할당된 타이머는 총 <b>3단계</b> (스스로 고민하며 푸는 시간, 힌트를 참고하며 푸는 시간, 해설하는 시간)로 존재합니다. 각 단계에서 시간 내에 완료되었다면 건너뛰기 할 수 있습니다. 데모 특성 상 각 단계를 10초 이내로 설정하였습니다. 
<br/>
<br/>

<table>
<tr >
<td align="center">
문제의 단계별 힌트
</td>
<td align="center">
블러처리된 힌트
</td>
</tr>
<tr>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/26d2dab4-1204-446c-8e6f-4823a7665551' width="300px">
    </td>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/274bf029-1c4d-479c-a790-88160ca17d8a' width="500px">
    </td>
</tr>
</table>

> 각 문제에 대한 단계별 힌트는 블러 처리되어 있으며, 클릭 시 확인할 수 있습니다. 

> 학습의 효과를 위해 블러 처리되어 있는 힌트는 개발자 도구나 복사 붙여넣기 등의 방법으로 확인할 수 없도록 다른 값을 할당하였습니다. 
<br/>
<br/>

<table>
<tr >
<td align="center">
마이페이지 내가 푼 문제 통계
</td>
<td align="center">
마이페이지 프로필 수정
</td>
</tr>
<tr>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/ae710459-92ab-4c56-9001-aa9e349aae0f' width="300px">
    </td>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/1d4c206a-9a12-43d2-ad62-d8c05a8fe94a' width="300px">
    </td>
</tr>
</table>

> 날짜별로 자신이 푼 문제의 개수를 확인할 수 있습니다. 

> 자신의 프로필 이미지 관리와 더불어 닉네임, 비밀번호 변경이 가능합니다. 
<br/>
<br/>


<table>
<tr >
<td align="center">
일반 사용자 로그인
</td>
<td align="center">
관리자 로그인
</td>
</tr>
<tr>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/4137ddf3-071e-4028-949e-35cafeccbede' width="300px">
    </td>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/47d947c1-dc6e-42aa-871b-7817b3510b82' width="300px">
    </td>
</tr>
</table>

> 관리자는 일반 사용자와 다르게 로그인 시 grade 속성을 admin으로 반환받아 bottom-tab에 마이페이지가 아닌 관리자페이지를 렌더링시켜 문제 및 힌트를 관리할 수 있는 루트를 두었습니다. 
<br/>
<br/>

<table>
<tr >
<td align="center">
관리자 문제 등록
</td>
<td align="center">
관리자 문제 삭제
</td>
</tr>
<tr>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/dd752d7e-3bb6-469b-a981-f96e8fdb364a' width="300px">
    </td>
<td align="center">
      <img src='https://github.com/assistant8/CodeMentor/assets/101612514/7384785b-b336-4ea6-88b2-dd8df1182769' width="300px">
    </td>
</tr>
</table>

> 관리자페이지에서 관리자는 문제 및 힌트 관리가 가능합니다.
<br/>
<br/>


## 💻 협업 툴

<figure align="center">
<img src="https://github.com/assistant8/CodeMentor/assets/101612514/68da47f7-f6c7-471a-ac30-7334fc7d8f90" alt="Gparkkii's Zepeto" width='700px'></img><br>
<figcaption>스크럼 및 미팅 진행</figcaption>
</figure>
<br><br><br>

<figure align="center">
<img src="https://github.com/assistant8/CodeMentor/assets/101612514/171f96ac-c8c0-431e-afb7-6fc455689cf9" alt="Gparkkii's Zepeto" width='700px'></img><br>
<figcaption>Jira 활용 개발 일정 관리</figcaption>
</figure>
<br><br><br>

<figure align="center">
<img src="https://github.com/assistant8/CodeMentor/assets/101612514/8a493ce8-8f91-4586-b077-ed38585f7bbd" alt="Gparkkii's Zepeto" width='700px'></img><br>
<figcaption>Figma 활용 와이어프레임 및 디자인 생성</figcaption>
</figure>
<br><br><br>

<figure align="center">
<img src="https://github.com/assistant8/CodeMentor/assets/101612514/b51202c6-fc4f-4ca1-92eb-c0931c789cba" alt="Gparkkii's Zepeto" width='700px'></img><br>
<figcaption>Gitlab 환경 내 소스 코드 관리 및 코드리뷰</figcaption>
</figure>
<br><br><br>

<figure align="center">
<img src="https://github.com/assistant8/CodeMentor/assets/101612514/b0e4a280-82b8-4a43-8412-85c0e6a7198a" alt="Gparkkii's Zepeto" width='700px'></img><br>
<figcaption>Lucidchart 활용한 ERD 구성 및 공유</figcaption>
</figure>
<br><br><br>

## 💻 ~~배포 링크~~  *현재 중단*
[CodeMentor](http://34.64.81.88/)

    ID: codemontor.emailverify@gmail.com
    PW: Adminpass1

<br/>
<br/>

## 💻 프론트 기술 스택
![image](https://github.com/assistant8/CodeMentor/assets/101612514/b58e7b7c-e2c2-4fb1-aeb6-bc1d49506d15)


