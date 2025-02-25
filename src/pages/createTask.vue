<template>
    <v-container>
      <v-card class="pa-5">
        <v-card-title class="text-h5">Criar Nova Task</v-card-title>
        <v-divider></v-divider>
  
        <v-form @submit.prevent="createTask">
          <v-text-field v-model="title" label="Título" required></v-text-field>
          <v-textarea v-model="description" label="Descrição" required></v-textarea>
  
          <v-alert v-if="errorMessage" type="error" class="mb-3">{{ errorMessage }}</v-alert>
  
          <v-btn color="primary" type="submit" block :loading="isLoading">Criar Task</v-btn>
        </v-form>
      </v-card>
    </v-container>
  </template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const title = ref('');
const description = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

// Função para criar a task
const createTask = async () => {
  if (!title.value || !description.value) {
    errorMessage.value = 'Preencha todos os campos!';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const token = localStorage.getItem('auth_token');
    const response = await axios.post(
      'http://127.0.0.1:8000/tasks/',
      {
        title: title.value,
        description: description.value
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log('Task criada com sucesso:', response.data);
    router.push('/dashboard'); // Redireciona para o dashboard
  } catch (error) {
    console.error('Erro ao criar task:', error);
    errorMessage.value = 'Erro ao criar a task. Tente novamente!';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>

</style>