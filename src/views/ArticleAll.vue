<template>
  <ul>
    <li v-for="article in articles">
      <h2><RouterLink :to="{path:'/article/detail/'+article.id}">{{ article.title }}</RouterLink></h2>
      <p>{{ article.content }}</p>
    </li>
  </ul>
  <p><RouterLink to="/article/page">更多</RouterLink></p>
  <p><RouterLink to="/article/search">搜索博客</RouterLink></p>
  <p><RouterLink to="/article/create">发布博客</RouterLink></p>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'

const articles = ref([]);

onMounted(() => {
  axios.get('https://localhost:7235/api/Blog/Article/QueryAll')
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
})
</script>