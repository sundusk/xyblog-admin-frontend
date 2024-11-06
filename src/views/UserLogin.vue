<template>
    <div class="login-container">
      <h2>登录</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">用户名:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">密码:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">登录</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from '@/api/axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/auth/login', {
            username: this.username,
            password: this.password
          });
          const token = response.data.token;
          localStorage.setItem('token', token); // 保存令牌
          this.$router.push('/dashboard'); // 登录成功后跳转到 Dashboard
        } catch (error) {
          this.errorMessage = '登录失败，请检查用户名或密码';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
  }
  </style>