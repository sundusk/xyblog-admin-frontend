import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/UserLogin.vue';
import ArticleList from '@/views/ArticleList.vue';
import CreateArticle from '@/views/CreateArticle.vue'; // 导入创建文章组件

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
    component: CreateArticle // 创建文章页面路由
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;