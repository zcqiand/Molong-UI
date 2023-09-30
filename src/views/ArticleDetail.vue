<template>
  <div>
    <h2>{{ article.title }}</h2>
    <p>{{ article.content }}</p>
    <p>发布时间：{{ article.publishDate }}</p>
    <p>点赞数：{{ article.Likes }}</p>
    <p>收藏数：{{ article.Collections.Count }}</p>
    <p>
      <RouterLink :to="{ path: '/article/' + article.id +'/comment/create' }">发布评论</RouterLink>
    </p>
    <div v-for="comment in article.comments">
      <p>{{ comment.content }}</p>
      <p>评论人: {{ comment.authorName }}</p>
      <p>发布时间: {{ comment.publishDate }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const article = ref({});

onMounted(() => {
  axios.get('https://localhost:7235/api/Blog/Article/GetDetail', {
    params: {
      id: route.params.id
    }
  })
    .then((response) => {
      // 请求成功，处理返回的数据
      console.log(response.data)
      const result = response.data
      if (result.code == 0) {
        article.value = result.data
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