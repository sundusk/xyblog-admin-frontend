<template>
    <div class="article-list-page">
      <h1 class="page-title">文章管理</h1>
      <!-- 创建文章按钮、标签管理按钮、分类管理按钮和测试页面按钮 -->
      <div class="button-group">
        <button class="create-article-button" @click="createArticle">创建文章</button>
        <button class="tag-manager-button" @click="manageTags">标签管理</button>
        <button class="category-manager-button" @click="manageCategories">分类管理</button>
        <button class="test-page-button" @click="goToTestPage">测试页面</button>
      </div>
      <table class="article-table">
        <thead>
          <tr>
            <th>标题</th>
            <th>分类</th>
            <th>标签</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article._id">
            <td>{{ article.title }}</td>
            <td>{{ getCategoryName(article.category) }}</td>
            <td>{{ getTagNames(article.tags) }}</td>
            <td>
              <button @click="editArticle(article._id)">编辑</button>
              <button @click="deleteArticle(article._id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from '@/api/axios';
  
  export default {
    data() {
      return {
        articles: [],
        categories: [],
        tags: []
      };
    },
    methods: {
      async fetchArticles() {
        try {
          const response = await axios.get('/posts');
          this.articles = response.data;
        } catch (error) {
          console.error("无法获取文章列表", error);
        }
      },
      async fetchCategories() {
        try {
          const response = await axios.get('/categories');
          this.categories = response.data;
        } catch (error) {
          console.error("无法获取分类列表", error);
        }
      },
      async fetchTags() {
        try {
          const response = await axios.get('/tags');
          this.tags = response.data;
        } catch (error) {
          console.error("无法获取标签列表", error);
        }
      },
      getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat._id === categoryId);
        return category ? category.name : '未知分类';
      },
      getTagNames(tagIds) {
        return tagIds
          .map(tagId => {
            const tag = this.tags.find(tag => tag._id === tagId);
            return tag ? tag.name : '未知标签';
          })
          .join(', ');
      },
      createArticle() {
        this.$router.push({ name: 'CreateArticle' });
      },
      manageTags() {
        this.$router.push({ name: 'TagManager' });
      },
      manageCategories() {
        this.$router.push({ name: 'CategoryManager' }); // 跳转到分类管理页面
      },
      goToTestPage() {
        this.$router.push({ name: 'TestPage' });
      },
      editArticle(id) {
        console.log("编辑文章 ID:", id);
      },
      async deleteArticle(id) {
        try {
          await axios.delete(`/posts/${id}`);
          this.fetchArticles();
        } catch (error) {
          console.error("删除失败", error);
        }
      }
    },
    async mounted() {
      await Promise.all([this.fetchArticles(), this.fetchCategories(), this.fetchTags()]);
    }
  };
  </script>
  
  <style scoped>
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .create-article-button, .tag-manager-button, .category-manager-button, .test-page-button {
    padding: 10px 20px;
    background-color: #5a67d8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .create-article-button:hover, .tag-manager-button:hover, .category-manager-button:hover, .test-page-button:hover {
    background-color: #434190;
  }
  
  .article-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .article-table th, .article-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .article-table th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  button {
    margin-right: 8px;
    padding: 6px 12px;
    background-color: #5a67d8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #434190;
  }
  </style>