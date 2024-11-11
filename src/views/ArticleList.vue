<template>
  <div class="article-list-page">
    <h1 class="page-title">文章管理</h1>

    <!-- 搜索和筛选功能 -->
    <div class="filter-group">
      <input
        type="text"
        v-model="searchKeyword"
        placeholder="搜索标题..."
        class="search-input"
      />
      <select v-model="selectedCategory" class="category-filter">
        <option value="">所有分类</option>
        <option v-for="cat in categories" :key="cat._id" :value="cat._id">
          {{ cat.name }}
        </option>
      </select>
      <select v-model="selectedTag" class="tag-filter">
        <option value="">所有标签</option>
        <option v-for="tag in tags" :key="tag._id" :value="tag._id">
          {{ tag.name }}
        </option>
      </select>
    </div>

    <!-- 创建文章按钮和其他管理按钮 -->
    <div class="button-group">
      <button class="create-article-button" @click="createArticle">创建文章</button>
      <button class="tag-manager-button" @click="manageTags">标签管理</button>
      <button class="category-manager-button" @click="manageCategories">分类管理</button>
      <button class="test-page-button" @click="goToTestPage">测试页面</button>
    </div>

    <!-- 文章列表 -->
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
        <tr v-for="article in paginatedArticles" :key="article._id">
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

    <!-- 分页 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  data() {
    return {
      articles: [],
      categories: [],
      tags: [],
      searchKeyword: '',
      selectedCategory: '',
      selectedTag: '',
      currentPage: 1,
      articlesPerPage: 5 // 每页显示的文章数量
    };
  },
  computed: {
    filteredArticles() {
      return this.articles.filter((article) => {
        const matchesKeyword =
          this.searchKeyword === '' || article.title.includes(this.searchKeyword);
        const matchesCategory =
          this.selectedCategory === '' || article.category === this.selectedCategory;
        const matchesTag =
          this.selectedTag === '' || article.tags.includes(this.selectedTag);
        return matchesKeyword && matchesCategory && matchesTag;
      });
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.filteredArticles.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredArticles.length / this.articlesPerPage);
    }
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
    createArticle() {
      this.$router.push({ name: 'CreateArticle' });
    },
    manageTags() {
      this.$router.push({ name: 'TagManager' });
    },
    manageCategories() {
      this.$router.push({ name: 'CategoryManager' });
    },
    goToTestPage() {
      this.$router.push({ name: 'TestPage' });
    },
    editArticle(id) {
      this.$router.push({ name: 'EditArticle', params: { id } });
    },
    async deleteArticle(id) {
      try {
        await axios.delete(`/posts/${id}`);
        this.fetchArticles();
      } catch (error) {
        console.error("删除失败", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
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

.button-group,
.filter-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.create-article-button,
.tag-manager-button,
.category-manager-button,
.test-page-button {
  padding: 10px 20px;
  background-color: #5a67d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.search-input,
.category-filter,
.tag-filter {
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.article-table {
  width: 100%;
  border-collapse: collapse;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
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