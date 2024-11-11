<template>
    <div class="draft-box-page">
      <h1 class="page-title">草稿箱</h1>
      
      <div v-if="drafts.length === 0" class="no-drafts">
        暂无草稿
      </div>
  
      <table v-else class="article-table">
        <thead>
          <tr>
            <th>标题</th>
            <th>分类</th>
            <th>标签</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in drafts" :key="article._id">
            <td>{{ article.title }}</td>
            <td>{{ getCategoryName(article.category) }}</td>
            <td>{{ getTagNames(article.tags) }}</td>
            <td>
              <button @click="editDraft(article._id)">编辑</button>
              <button @click="publishDraft(article._id)">发布</button>
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
        drafts: [],
        categories: [],
        tags: []
      };
    },
    methods: {
      async fetchDrafts() {
        try {
          const response = await axios.get('/posts', { params: { status: 'draft' } });
          this.drafts = response.data;
        } catch (error) {
          console.error("无法获取草稿列表", error);
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
        const category = this.categories.find((cat) => cat._id === categoryId);
        return category ? category.name : '未知分类';
      },
      getTagNames(tagIds) {
        return tagIds
          .map((tagId) => {
            const tag = this.tags.find((tag) => tag._id === tagId);
            return tag ? tag.name : '未知标签';
          })
          .join(', ');
      },
      editDraft(id) {
        this.$router.push({ name: 'EditArticle', params: { id } });
      },
      async publishDraft(id) {
        try {
          await axios.put(`/posts/${id}`, { status: 'published' });
          alert('草稿已发布');
          this.fetchDrafts(); // 重新加载草稿列表
        } catch (error) {
          console.error("发布草稿失败", error);
        }
      }
    },
    async mounted() {
      await Promise.all([this.fetchDrafts(), this.fetchCategories(), this.fetchTags()]);
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
  
  .no-drafts {
    text-align: center;
    font-size: 18px;
    color: #999;
    margin-top: 20px;
  }
  
  .article-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .article-table th,
  .article-table td {
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