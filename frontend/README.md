# frontend
This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration
See [Vite Configuration Reference](https://vite.dev/config/).

< 프로젝트 실행 방법 ><br>
1. 터미널에서 프로젝트 폴더로 이동 
```sh
cd ..\MoneyLog\frontend
```
2. 모듈 설치 
```sh
npm install
```
3. 실행 
```sh
npm run dev
```
4. http://localhost:5000/ 동작 확인 

### 빌드 (Express로 배포 시 필요한 정적파일 dist/ 생성)
```sh
npm run build
```
### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```

< 기본 정보 ><br>
vue 버전 : 3.5.13<br>
5000번 포트 사용 (http://localhost:5000/)<br>

프로젝트 구조<br>
```js
 MoneyLog/
 ├── backend/               # Node.js 백엔드 서버 (Express + MySQL)
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
```
