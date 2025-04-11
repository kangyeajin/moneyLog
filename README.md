* moneyLog 백엔드 서버 프로젝트입니다.
<!-- * 운영 시 Vue를 정적 파일로 서빙해 통합 운영할 예정입니다.-->

* 수정 중...

< 프로젝트 실행 방법 ><br>
1. 터미널에서 프로젝트 폴더로 이동 
- cd ..\MoneyLog\
2. 모듈 설치 
- npm install
3. 실행 
  * 개발환경 : npm run dev (nodemon으로 실행)
  * 운영환경 : npm run start 
4. http://localhost:5001/ 동작 확인 

< 기본 정보 ><br>
node.js 버전 : v20.16.0<br>
npm 버전 : 10.8.1<br>
5001번 포트 사용(http://localhost:5001/)<br>

* 기본설치패키지 : npm install dotenv express express-session body-parser express-rate-limit mssql path

프로젝트 구조<br>
```js
 MoneyLog/
 ├── backend/             # Node.js 백엔드 서버
 │   ├── src/             # 소스 코드 (가독성을 위해 추가)
 │   │   ├── controllers/ # 컨트롤러 (비즈니스 로직)
 │   │   ├── front/       # vue 파일 (운영 시 추가할 예정)
 │   │   ├── models/      # DB 모델 (ORM 또는 Query)
 │   │   ├── routes/      # API 라우트 관리
 │   │   ├── utils/       # 공통 유틸 함수
 │   │   ├── app.js       # Express 앱 설정
 │   │   └── dbconfig.js  # DB 설정
 │   ├── .env             # 환경 변수 파일
 │   ├── package.json     # Node.js 패키지 정보
 │   ├── package-lock.json
 │   ├── .gitignore
 │   └── README.md
 └── frontend/          # Vue 프론트엔드 프로젝트
```