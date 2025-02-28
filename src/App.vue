<template>
  <v-app class="custom-background">
    <v-app-bar app>
      <v-toolbar-title>Task Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!authStore.isAuthenticated" text to="/login">Login</v-btn>
      <v-btn v-else text @click="handleLogout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

// Garante que a autenticação seja verificada ao carregar a aplicação
onMounted(() => {
  authStore.checkAuth();
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login'); // Redireciona para login após deslogar
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background-color: #a0fffa;
}

.custom-background {
  background-color: #a0fffa;
}
</style>
