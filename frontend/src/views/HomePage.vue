<template>
  <div class="center">
    <button @click="router.push('/payment')">결제 페이지로 이동</button>
    <button @click="router.push('/test')">test 페이지로 이동</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style>
.center {
   text-align: center;
}
</style>
