<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6" max-width="400">
      <v-card-title class="text-h5 text-center">Login</v-card-title>
      <v-card-subtitle class="text-center">Acesse sua conta</v-card-subtitle>

      <v-form @submit.prevent="submitLogin">
        <v-text-field
          v-model="credentials.username"
          label="Usuário"
          prepend-icon="mdi-account"
          required
        ></v-text-field>

        <v-text-field
          v-model="credentials.password"
          label="Senha"
          type="password"
          prepend-icon="mdi-lock"
          required
        ></v-text-field>

        <v-row>
          <v-col cols="6">
            <v-btn block color="secondary" @click="goToRegister">
              Registrar
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn :loading="isLoading" block color="primary" type="submit">
              Entrar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>
        {{ errorMessage }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      errorMessage: '',
      isLoading: false
    };
  },
  methods: {
    async submitLogin() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const response = await this.$axios.post('http://127.0.0.1:8000/login/', this.credentials);
        const { access, refresh } = response.data;

        localStorage.setItem('auth_token', access);
        localStorage.setItem('refresh_token', refresh);

        this.$router.push('/dashboard'); // Redireciona para o dashboard ou outra página
      } catch (error) {
        this.errorMessage = error.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.';
      } finally {
        this.isLoading = false;
      }
    },

    goToRegister() {
      this.$router.push('/register'); // Redireciona para a página de registro
    }
  }
};
</script>

<style scoped>
.v-card {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
