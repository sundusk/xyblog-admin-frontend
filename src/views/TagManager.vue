<template>
    <div class="tag-manager">
      <h1 class="page-title">标签管理</h1>
      <div class="tag-creation">
        <input type="text" v-model="newTagName" placeholder="输入新标签名称" />
        <button @click="createTag" class="create-button">创建标签</button>
      </div>
      
      <div class="tag-list">
        <div v-for="tag in tags" :key="tag._id" class="tag-item">
          <input type="text" v-model="tag.name" class="tag-name" @blur="updateTag(tag)" />
          <button @click="deleteTag(tag._id)" class="delete-button">删除</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/api/axios';
  
  export default {
    data() {
      return {
        tags: [],
        newTagName: ''
      };
    },
    methods: {
      async fetchTags() {
        try {
          const response = await axios.get('/tags');
          this.tags = response.data;
        } catch (error) {
          console.error("获取标签失败", error);
        }
      },
      async createTag() {
        if (!this.newTagName) return;
        try {
          const response = await axios.post('/tags/create', { name: this.newTagName });
          this.tags.push(response.data.tag);
          this.newTagName = '';
        } catch (error) {
          console.error("创建标签失败", error);
        }
      },
      async updateTag(tag) {
        try {
          await axios.put(`/tags/${tag._id}`, { name: tag.name });
        } catch (error) {
          console.error("更新标签失败", error);
        }
      },
      async deleteTag(tagId) {
        try {
          await axios.delete(`/tags/${tagId}`);
          this.tags = this.tags.filter(tag => tag._id !== tagId);
        } catch (error) {
          console.error("删除标签失败", error);
        }
      }
    },
    mounted() {
      this.fetchTags();
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
  
  .tag-manager {
    width: 600px;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .tag-creation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .tag-creation input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .create-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #5a67d8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .tag-list {
    margin-top: 20px;
  }
  
  .tag-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .tag-name {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
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