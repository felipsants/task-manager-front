<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="submitLogin">
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>

    <!-- Exibir erros -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
  async submitLogin() {
    try {
      const response = await this.$axios.post('http://127.0.0.1:8000/login/', {
        username: this.username,
        password: this.password
      })
      // Armazenar o token se login for bem-sucedido
      localStorage.setItem('auth_token', response.data.access)
      this.errorMessage = 'Login bem-sucedido!'
    } catch (error) {
      // Exibe a resposta completa no console para depuração
      if (error.response) {
        console.log('Erro resposta:', error.response)
        this.errorMessage = error.response.data.detail || 'Erro desconhecido na resposta';
      } else if (error.request) {
        // Se a requisição foi feita, mas sem resposta
        console.log('Erro requisição:', error.request)
        this.errorMessage = 'Sem resposta da API';
      } else {
        // Outro tipo de erro
        console.log('Erro geral:', error.message)
        this.errorMessage = 'Erro ao fazer login';
      }
    }
  }
}


}
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
