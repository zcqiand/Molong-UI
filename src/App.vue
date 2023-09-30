<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="header">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register">用户注册</RouterLink>
      <RouterLink to="/article/all">博客首页</RouterLink>
    </nav>
  </div>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
.header {
  line-height: 1.5;
  max-height: 100vh;
}

.content {
  margin-top: 1rem;
  width: 100%;
  min-height: 90vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
