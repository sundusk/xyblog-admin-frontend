<template>
    <div class="create-article-page">
      <div class="card">
        <h1 class="page-title">创建文章</h1>
        <form @submit.prevent="submitArticle">
          <div class="form-group">
            <label for="title">标题</label>
            <input type="text" id="title" v-model="title" class="title-input" required />
          </div>
  
          <div class="form-group">
            <label for="category">分类</label>
            <select id="category" v-model="category" class="category-input">
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                {{ cat.name }}
              </option>
            </select>
          </div>
  
          <div class="form-group tags-group">
            <label for="tags">标签</label>
            <div class="tags-container">
              <div 
                v-for="tag in tagsList" 
                :key="tag._id" 
                :class="['tag-item', { 'tag-selected': tags.includes(tag._id) }]"
                @click="toggleTag(tag._id)"
              >
                {{ tag.name }}
              </div>
            </div>
          </div>
  
          <div class="form-group">
            <label for="content">内容</label>
            <textarea id="content" v-model="content" rows="10"></textarea>
          </div>
  
          <div class="button-group">
            <button type="button" class="back-button" @click="goBack">返回</button>
            <button type="submit" class="save-button">保存</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/api/axios';
  
  export default {
    data() {
      return {
        title: '',
        category: '',
        tags: [],
        content: '',
        categories: [],
        tagsList: []
      };
    },
    methods: {
      async fetchCategoriesAndTags() {
        try {
          const [categoriesResponse, tagsResponse] = await Promise.all([
            axios.get('/categories'),
            axios.get('/tags')
          ]);
          this.categories = categoriesResponse.data;
          this.tagsList = tagsResponse.data;
        } catch (error) {
          console.error("无法加载分类和标签", error);
        }
      },
      async submitArticle() {
  try {
    const articleData = {
      title: this.title,
      category: this.category,
      tags: this.tags,
      content: this.content
    };
    await axios.post('/posts/create', articleData); // 添加 `/create` 路径
    alert('文章创建成功！');
    this.$router.push('/articles'); // 跳转到文章列表页面
  } catch (error) {
    console.error("文章创建失败", error);
  }
},
      goBack() {
        this.$router.push('/articles'); // 返回文章列表页面
      },
      toggleTag(tagId) {
        if (this.tags.includes(tagId)) {
          this.tags = this.tags.filter(tag => tag !== tagId);
        } else {
          this.tags.push(tagId);
        }
      }
    },
    mounted() {
      this.fetchCategoriesAndTags();
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
  
  .create-article-page {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  
  .card {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 1000px;
    margin: 100px auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 8px;
    display: block;
  }
  
  /* 控制标题和分类框的宽度 */
  .title-input {
    width: 30%;
  }
  
  .category-input {
    width: 20%;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
    box-sizing: border-box;
    resize: none;
  }
  
  .tags-group {
    margin-bottom: 20px;
  }
  
  .tags-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .tag-item {
    padding: 8px 12px;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
    font-size: 14px;
    border: 1px solid #ddd;
  }
  
  .tag-selected {
    background-color: #5a67d8;
    color: white;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .save-button, .back-button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }
  
  .save-button {
    background-color: #5a67d8;
    color: white;
  }
  
  .save-button:hover {
    background-color: #434190;
  }
  
  .back-button {
    background-color: #e0e0e0;
    color: #333;
  }
  
  .back-button:hover {
    background-color: #c0c0c0;
  }
  </style>