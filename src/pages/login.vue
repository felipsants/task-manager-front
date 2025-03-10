<template>
  <v-container class="container-center">
    <v-card class="pa-6 my-frosted-card" max-width="400">
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
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

export default {
  setup() {
    const authStore = useAuthStore();

    // Criamos refs para armazenar os dados do formulário
    const credentials = ref({
      username: '',
      password: ''
    });
    const errorMessage = ref('');
    const isLoading = ref(false);

    return { authStore, credentials, errorMessage, isLoading };
  },
  methods: {
    async submitLogin() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const response = await this.$axios.post('http://127.0.0.1:8000/login/', this.credentials);
        const { access } = response.data;

        if (!access) throw new Error('Token não recebido.');

        this.authStore.login(access);

        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = error.response?.data?.detail || 'Erro ao fazer login.';
      } finally {
        this.isLoading = false;
      }
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>

.my-frosted-card {
  background: rgba(70, 70, 70, 0.3); /* cor branca com opacidade */
  backdrop-filter: blur(10px);          /* aplica o efeito de desfoque */
  -webkit-backdrop-filter: blur(10px);   /* para compatibilidade com WebKit */
  border: 1px solid rgba(255, 255, 255, 0.2); /* borda sutil */
  border-radius: 16px;                   /* bordas arredondadas */
}

.container-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Garante que ocupa toda a tela */
  width: 100vw; /* Garante largura total */
}
</style>
