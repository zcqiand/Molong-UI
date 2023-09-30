<template>
  <div>
    <div><label>评论人: </label><input v-model="formData.authorName"></div>
    <div><label>内容: </label><QuillEditor theme="snow" v-model:content="formData.content" contentType="html"/></div>
    <div class="buttons">
      <button @click="create">发布</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// 要提交的数据
const route = useRoute()
const formData = reactive({
  articleId: '',
  authorName: '',
  content: ''
});

onMounted(() => {
  console.log(route.params.articleId)
  formData.articleId = route.params.articleId
});

function create() {
  console.log(formData)
  axios.post('https://localhost:7235/api/Blog/Comment/Create', formData)
    .then((response) => {
      // 请求成功，处理返回的数据
      console.log(response.data);
      const result = response.data
      if (result.code == 0) {
        alert("成功发布评论！")
      }
      else {
        // 请求失败，处理错误
        console.error(result.message)
      }
    })
    .catch((error) => {
      // 请求失败，处理错误
      console.error(error);
    });
}
</script>