<template>
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card max-width="500">
        <v-card-title class="text-h5">Sessão Expirada</v-card-title>
        <v-card-text>
          Sua sessão expirou. Por favor, faça login novamente para continuar.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="goToLogin">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';

  const authStore = useAuthStore();
  const router = useRouter();
  
  const goToLogin = () => {
    authStore.logout();
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh;
  }
  </style>
  