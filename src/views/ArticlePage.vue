<template>
  <ul>
    <li v-for="article in articles">
      <h2>{{ article.title }}</h2>
      <p>{{ article.content }}</p>
    </li>
  </ul>
  共 {{ total }} 记录
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'

const articles = ref([]);
const currentPage = ref(1);
const total = ref(0);

onMounted(() => {
  axios.get('https://localhost:7235/api/Blog/Article/QueryPage', {
    params: {
      page: currentPage.value
    }
  })
    .then((response) => {
      // 请求成功，处理返回的数据
      console.log(response.data)
      const result = response.data
      if (result.code == 0) {
        articles.value = result.data.items
        total.value = result.data.total
      }
      else {
        // 请求失败，处理错误
        console.error(result.message)
      }
    })
    .catch((error) => {
      // 请求失败，处理错误
      console.error(error)
    });
})
</script>