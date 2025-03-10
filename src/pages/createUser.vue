<template>
    <v-container class="container-center">
        <v-card class="pa-6 my-frosted-card custom-card" >
        <v-card-title>Criar Usuário</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="createUser">
            <v-text-field v-model="name" label="Nome" required></v-text-field>
            <v-text-field v-model="email" label="E-mail" required></v-text-field>
            <v-text-field v-model="password" label="Senha" type="password" required></v-text-field>
    
            <v-alert v-if="errorMessage" type="error" class="mb-3">{{ errorMessage }}</v-alert>
    
            <v-btn color="primary" type="submit" block :loading="isLoading">Criar Usuário</v-btn>
            </v-form>
        </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

// Função para criar o usuário
const createUser = async () => {
    if (!name.value || !email.value || !password.value) {
        errorMessage.value = 'Preencha todos os campos!';
        return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    try {
        const response = await axios.post(
        'http://127.0.0.1:8000/register/',
        {
            username: name.value,
            email: email.value,
            password: password.value
        }
        );

        console.log('Usuário criado com sucesso:', response.data);
        router.push('/login'); // Redireciona para o login
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        errorMessage.value = 'Erro ao criar o usuário. Tente novamente!';
    } finally {
        isLoading.value = false;
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

.custom-card {
  width: 600px !important; /* Força o tamanho */
  max-width: 90%; /* Garante responsividade */
}

.container-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Garante que ocupa toda a tela */
  width: 100vw; /* Garante largura total */
}
</style>