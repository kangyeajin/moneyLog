프로젝트 기본 구조는 다음과 같습니다.<br>

backend와 frontend로 구분되며, 개발 시 각 서버를 구동해야 합니다. <br>

## 프로젝트 실행 순서
1. backend 내 .env DB정보 수정 및 .env 파일 추가
2. mysql sys Database에 test 테이블 생성
```mysql
CREATE TABLE sys.NewTable (
	name varchar(100) NULL,
	email varchar(100) NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
```
3. backend 실행 (http://localhost:5001)
4. frontend 실행 (http://localhost:5000)
```js
메인화면에 DB 값이 잘 조회되거나,
POST 전송 시 DB에 값 insert되면 잘 성공한 것. 
url : http://localhost:5000/api/users 
body : 
{
  "name":"name33", 
  "email":"33@naver.com"
}
```

<< 전체 프로젝트 구조 >><br>
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
 │
 ├── frontend/              # Vue 프론트엔드 프로젝트 (Vite)
 │   ├── src/               # 소스 코드
 │   │   ├── components/    # 재사용 가능한 Vue 컴포넌트
 │   │   ├── css/
 │   │   ├── img/
 │   │   ├── js/
 │   │   ├── views/         # 페이지별 Vue 컴포넌트
 │   │   ├── router/        # Vue Router 설정
 │   │   ├── services/      # API 요청 관리 (Axios 등)
 │   │   ├── App.vue        # 메인 App 파일
 │   │   └── main.js        # Vue 진입점
 │   ├── public/            # 정적 파일
 │   ├── index.html
 │   ├── vite.config.js     # Vite 설정 (proxy설정해둠)
 │   ├── package.json
 │   ├── package-lock.json
 │   ├── .gitignore
 │   ├── .env               # 프로젝트 환경 설정
 │   └── README.md
 │
 ├── docs/              # 프로젝트 문서 (API, ERD 등)
 ├── .gitignore
 ├── .editorconfig
 ├── README.md          # 최상위 프로젝트 설명
 └── .vscode/           # VSCode 설정
