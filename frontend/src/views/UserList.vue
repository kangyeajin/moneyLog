<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const loading = ref(true);
const error = ref(null);

// 사용자 목록 가져오기
const fetchUsers = async () => {
  try {
    const response = await axios.get("/api/users"); // 기본 URL 없이 경로만 사용
    users.value = response.data;
  } catch (error) {
    error.value = "사용자 데이터를 불러오는 데 실패했습니다.";
  } finally {
    loading.value = false;
  }
};

// 컴포넌트가 마운트되면 자동 실행
onMounted(fetchUsers);
</script>

<template>
  <div class="container">
    <h2>사용자 목록</h2>

    <div v-if="loading">⏳ 로딩 중...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        👤 {{ user.name }} - 📧 {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
.error {
  color: red;
  font-weight: bold;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #f5f5f5;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>
