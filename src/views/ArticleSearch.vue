<template>
  <input type="text" v-model="keyword" placeholder="Enter keyword..." />
  <button @click="search">搜索</button>

  <ul>
    <li v-for="article in articles">
      <h2>
        <RouterLink :to="{ path: '/article/detail/' + article.id }">{{ article.title }}</RouterLink>
      </h2>
      <p>{{ article.content }}</p>
    </li>
  </ul>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'

const articles = ref([]);
const keyword = ref('');

function search() {
  axios.get('https://localhost:7235/api/Blog/Article/QuerySearch', {
    params: {
      keyword: keyword.value
    }
  })
    .then((response) => {
      // 请求成功，处理返回的数据
      console.log(response.data)
      const result = response.data
      if (result.code == 0) {
        articles.value = result.data
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
}
</script>