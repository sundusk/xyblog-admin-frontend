<template>
  <div class="create-article-page">
    <div class="card">
      <h1 class="page-title">创建文章</h1>
      <form>
        <div class="form-group">
          <label for="title">标题</label>
          <input type="text" id="title" v-model="title" class="title-input" required />
        </div>

        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" v-model="category" @change="updateCategoryDescription" class="category-input">
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">
              {{ cat.name }}
            </option>
          </select>
          <p v-if="categoryDescription" class="category-description">{{ categoryDescription }}</p>
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
          <div ref="editorContainer" class="quill-editor"></div>
        </div>

        <div class="button-group">
          <button type="button" class="draft-button" @click="saveAsDraft">保存为草稿</button>
          <button type="button" class="publish-button" @click="publishArticle">发布</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  data() {
    return {
      title: '',
      category: '',
      tags: [],
      content: '',
      categories: [],
      tagsList: [],
      quill: null,
      categoryDescription: ''
    };
  },
  methods: {
    async fetchCategoriesAndTags() {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get('/categories'),
          axios.get('/tags'),
        ]);
        this.categories = categoriesResponse.data;
        this.tagsList = tagsResponse.data;
      } catch (error) {
        console.error('无法加载分类和标签', error);
      }
    },
    updateCategoryDescription() {
      const selectedCategory = this.categories.find(cat => cat._id === this.category);
      this.categoryDescription = selectedCategory ? selectedCategory.description : '';
    },
    async saveAsDraft() {
      await this.submitArticle('draft');
    },
    async publishArticle() {
      await this.submitArticle('published');
    },
    async submitArticle(status) {
      try {
        const articleData = {
          title: this.title,
          category: this.category,
          tags: this.tags,
          content: this.quill.root.innerHTML,
          status: status // 将草稿或发布状态传递到后端
        };
        await axios.post('/posts/create', articleData);
        alert(`文章${status === 'draft' ? '已保存为草稿' : '已发布'}！`);
        this.$router.push('/articles');
      } catch (error) {
        console.error('文章提交失败', error);
        alert(`提交文章时出错: ${error.response?.data?.message || '未知错误'}`);
      }
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

    const toolbarOptions = [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ];

    this.quill = new Quill(this.$refs.editorContainer, {
      theme: 'snow',
      placeholder: '请输入文章内容...',
      modules: {
        toolbar: toolbarOptions,
      },
    });
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

.title-input {
  width: 30%;
  text-align: center;
}

.category-input {
  width: 20%;
}

.category-description {
  color: #888;
  font-size: 14px;
  margin-top: 5px;
}

.input, select, textarea {
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

.quill-editor {
  height: 300px;
  background-color: #fff;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.draft-button, .publish-button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.draft-button {
  background-color: #e0e0e0;
  color: #333;
}

.draft-button:hover {
  background-color: #c0c0c0;
}

.publish-button {
  background-color: #5a67d8;
  color: white;
}

.publish-button:hover {
  background-color: #434190;
}
</style>