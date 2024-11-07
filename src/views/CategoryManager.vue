<!-- src/views/CategoryManager.vue -->
<template>
    <div class="category-manager">
      <h1 class="page-title">分类管理</h1>
      <div class="category-creation">
        <input type="text" v-model="newCategoryName" placeholder="输入新分类名称" />
        <input type="text" v-model="newCategoryDescription" placeholder="输入分类描述" />
        <button @click="createCategory" class="create-button">创建分类</button>
      </div>
      
      <div class="category-list">
        <div v-for="category in categories" :key="category._id" class="category-item">
          <input type="text" v-model="category.name" class="category-name" @blur="updateCategory(category)" />
          <input type="text" v-model="category.description" class="category-description" @blur="updateCategory(category)" />
          <button @click="deleteCategory(category._id)" class="delete-button">删除</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/api/axios';
  
  export default {
    data() {
      return {
        categories: [],
        newCategoryName: '',
        newCategoryDescription: ''
      };
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get('/categories');
          this.categories = response.data;
        } catch (error) {
          console.error("获取分类失败", error);
        }
      },
      async createCategory() {
        if (!this.newCategoryName || !this.newCategoryDescription) return;
        try {
          const response = await axios.post('/categories/create', { 
            name: this.newCategoryName, 
            description: this.newCategoryDescription 
          });
          this.categories.push(response.data.category);
          this.newCategoryName = '';
          this.newCategoryDescription = '';
        } catch (error) {
          console.error("创建分类失败", error);
        }
      },
      async updateCategory(category) {
        try {
          await axios.put(`/categories/${category._id}`, { 
            name: category.name, 
            description: category.description 
          });
        } catch (error) {
          console.error("更新分类失败", error);
        }
      },
      async deleteCategory(categoryId) {
        try {
          await axios.delete(`/categories/${categoryId}`);
          this.categories = this.categories.filter(category => category._id !== categoryId);
        } catch (error) {
          console.error("删除分类失败", error);
        }
      }
    },
    mounted() {
      this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }
  
  .category-manager {
    width: 600px;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .category-creation {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .category-creation input {
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .create-button {
    padding: 10px;
    font-size: 16px;
    background-color: #5a67d8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .category-list {
    margin-top: 20px;
  }
  
  .category-item {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .category-name, .category-description {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .delete-button {
    padding: 6px 12px;
    font-size: 14px;
    color: white;
    background-color: #e53e3e;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>