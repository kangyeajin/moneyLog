import { createRouter, createWebHistory } from "vue-router";
import UserList from "@/views/UserList.vue"; // UserList.vue 가져오기

const routes = [
  {
    path: "/", // 기본 경로 설정
    name: "UserList",
    component: UserList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
