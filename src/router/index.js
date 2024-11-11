import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/UserLogin.vue';
import ArticleList from '@/views/ArticleList.vue';
import CreateArticle from '@/views/CreateArticle.vue';
import EditArticle from '@/views/EditArticle.vue'; // 导入编辑文章组件
import TagManager from '@/views/TagManager.vue';
import TestPage from '@/views/TestPage.vue';
import CategoryManager from '@/views/CategoryManager.vue';
import DraftBox from '@/views/DraftBox.vue'; // 导入草稿箱组件

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
    path: '/articles/edit/:id', // 编辑文章页面，带有文章ID参数
    name: 'EditArticle',
    component: EditArticle,
    meta: { requiresAuth: true }
  },
  {
    path: '/tag-manager',
    name: 'TagManager',
    component: TagManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/test-page',
    name: 'TestPage',
    component: TestPage
  },
  {
    path: '/category-manager',
    name: 'CategoryManager',
    component: CategoryManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/draft-box', // 草稿箱页面路由
    name: 'DraftBox',
    component: DraftBox,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;