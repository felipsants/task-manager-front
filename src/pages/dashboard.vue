<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const tasks = ref([])

// Busca as tasks do usuário autenticado
const fetchTasks = async () => {
  try {
    const token = localStorage.getItem('auth_token')  // Obtém o token do usuário logado
    const response = await axios.get('http://127.0.0.1:8000/tasks/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    tasks.value = response.data  // Atualiza a lista de tasks
  } catch (error) {
    console.error('Erro ao buscar tasks:', error)
  }
}

// Atualiza o status da task (completa/incompleta)
const toggleTask = async (task) => {
  try {
    const token = localStorage.getItem('auth_token');

    // Envia a solicitação com o estado contrário ao atual
    const response = await axios.patch(`http://127.0.0.1:8000/tasks/${task.id}/`, 
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Agora atualiza a interface com a resposta do backend
    task.completed = response.data.completed;

  } catch (error) {
    console.error('Erro ao atualizar task:', error);
  }
}

// Navega para a página de criação de task
const goToCreate = () => {
  router.push('/create')
}

// Carrega as tasks ao iniciar a página
onMounted(fetchTasks)
</script>

<template>
  <v-container class="container-center">
    <v-card class="pa-6 my-frosted-card custom-card" >
      <v-card-title class="text-h5">Minhas Tasks</v-card-title>
      <v-divider></v-divider>

      <!-- Lista de Tasks -->
      <v-list class="custom-list-item">
        <v-list-item v-for="task in tasks" :key="task.id">
          <template v-slot:prepend>
            <v-checkbox 
              :model-value="task.completed" 
              @change="toggleTask(task)" 
            ></v-checkbox>
          </template>
          <v-list-item-content>
            <v-list-item-title :class="{ 'text-decoration-line-through': task.completed }">
              {{ task.title }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- Botão para Criar Nova Task -->
      <v-btn color="primary" class="mt-4" block @click="goToCreate">
        Criar Nova Task
      </v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.my-frosted-card {
  background: rgba(70, 70, 70, 0.3); /* cor branca com opacidade */
  backdrop-filter: blur(10px);          /* aplica o efeito de desfoque */
  -webkit-backdrop-filter: blur(10px);   /* para compatibilidade com WebKit */
  border: 1px solid rgba(255, 255, 255, 0.2); /* borda sutil */
  border-radius: 16px;                   /* bordas arredondadas */
}

.custom-list-item {
  background: rgba(255, 255, 255, 0.725); /* cor branca com opacidade */
  backdrop-filter: blur(10px);          /* aplica o efeito de desfoque */
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;   /* para compatibilidade com WebKit */
}

.container-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Garante que ocupa toda a tela */
  width: 100vw; /* Garante largura total */
}
</style>