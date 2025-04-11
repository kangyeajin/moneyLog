import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/views/HomePage.vue' // main page
import UserList from "@/views/UserList.vue"; // UserList.vue 가져오기
import PaymentPage from '@/views/payment/PaymentPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/payment', name: 'Payment', component: PaymentPage },
  { path: '/test', name: 'Contact', component: UserList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
