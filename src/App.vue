<template>
  <v-app class="custom-background">
    <v-app-bar app>
      <v-toolbar-title>Task Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/login">Login</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup>
import { VApp, VAppBar, VToolbarTitle, VSpacer, VBtn, VMain } from 'vuetify/components';
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background-color: #a0fffa; /* Altere esta cor para a cor de fundo desejada */
}

.custom-background {
  background-color: #a0fffa; /* Altere esta cor para a cor de fundo desejada */
}
</style>