import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 라우터 가져오기
import './css/main.css'

const app = createApp(App);
app.use(router); // Vue 앱에 라우터 추가
app.mount("#app");
