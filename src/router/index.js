// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/UserLogin.vue';
import ArticleList from '@/views/ArticleList.vue';
import CreateArticle from '@/views/CreateArticle.vue';
import TagManager from '@/views/TagManager.vue';
import TestPage from '@/views/TestPage.vue'; // 导入TestPage组件
import CategoryManager from '@/views/CategoryManager.vue'; // 确保路径和名称正确

const routes = [
  {
    path: '/',
    redirect: '/login' // 默认重定向到登录页面
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/articles/create',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: '/tag-manager',
    name: 'TagManager',
    component: TagManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/test-page', // 新增TestPage路由
    name: 'TestPage',
    component: TestPage
  },
  {
    path: '/category-manager',
    name: 'CategoryManager',
    component: CategoryManager, // 确保此处引用的名称正确
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;