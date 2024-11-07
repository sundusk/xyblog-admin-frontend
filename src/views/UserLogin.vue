<template>
  <div class="login-page">
    <h1 class="system-title">Sundusk 博客管理系统</h1>
    <div class="login-card">
      <h2 class="login-title">登录</h2>
      <input type="text" placeholder="账号" class="input-field" v-model="username" />
      <input type="password" placeholder="密码" class="input-field" v-model="password" />
      <button class="login-button" @click="handleLogin">登录</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios'; // 引入 Axios 实例

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('/auth/login', {
        username: this.username,
        password: this.password
       });
      const { token } = response.data;
      localStorage.setItem('token', token); // 存储 JWT 令牌
      this.$router.push('/articles'); // 登录成功后跳转到文章管理页面
      } catch (error) {
        this.errorMessage = error.response?.data?.message || '登录失败';
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.system-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.login-card {
  background: linear-gradient(to bottom, #8ec5fc, #e0c3fc); /* 卡片渐变背景 */
  padding: 40px;
  width: 400px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.login-title {
  color: #fff;
  font-size: 22px;
  margin-bottom: 20px;
}

.input-field {
  width: calc(100% - 24px);
  padding: 12px;
  margin: 12px auto;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  display: block;
}

.login-button {
  width: calc(100% - 24px);
  padding: 12px;
  margin: 0 auto;
  background-color: #5a67d8;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  display: block;
}

.login-button:hover {
  background-color: #434190;
}

.error-message {
  color: #e53e3e;
  font-size: 14px;
  margin-top: 10px;
}
</style>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #e0f0ff;
}

#app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>