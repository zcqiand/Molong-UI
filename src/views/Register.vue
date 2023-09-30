<template>
  <div>
    <div>用户名称: <input v-model="formData.username"></div>
    <div>用户邮箱: <input v-model="formData.email"></div>
    <div>用户密码: <input v-model="formData.password" type="password"></div>
    <div>确认密码: <input v-model="formData.confirmPassword" type="password"></div>
    <div class="buttons">
      <button @click="register">注册</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive,onMounted } from 'vue'

// 要提交的数据
const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

function register() {
  axios.post('https://localhost:7235/api/Blog/User/Register', formData)
    .then((response) => {
      // 请求成功，处理返回的数据
      console.log(response.data);
    })
    .catch((error) => {
      // 请求失败，处理错误
      console.error(error);
    });
}
</script>