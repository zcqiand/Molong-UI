import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/article/all',
      name: 'ArticleAll',
      component: () => import('../views/ArticleAll.vue')
    },
    {
      path: '/article/all',
      name: 'ArticleAll',
      component: () => import('../views/ArticleAll.vue')
    },
    {
      path: '/article/page',
      name: 'ArticlePage',
      component: () => import('../views/ArticlePage.vue')
    },
    {
      path: '/article/search',
      name: 'ArticleSearch',
      component: () => import('../views/ArticleSearch.vue')
    },
    {
      path: '/article/detail/:id',
      name: 'ArticleDetail',
      component: () => import('../views/ArticleDetail.vue')
    },
    {
      path: '/article/create',
      name: 'ArticleCreate',
      component: () => import('../views/ArticleCreate.vue')
    },
    {
      path: '/article/:articleId/comment/create',
      name: 'CommentCreate',
      component: () => import('../views/CommentCreate.vue')
    }
  ]
})

export default router
