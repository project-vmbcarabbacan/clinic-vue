<template>
  <v-snackbar
    v-model="globalStore.snackbar"
    vertical
    color="#f8f8f8"
    class="custom-snackbar"
    location-strategy="connected"
    :target="[screenWith, 0]"
  >
    <div class="text-subtitle-1 pb-2">{{ globalStore.message }}</div>
  </v-snackbar>
  <router-view/>
</template>

<script setup>
import { ref } from 'vue';
import { useGlobalStore } from './presentation/store/GlobalStore';

const globalStore = useGlobalStore();

const screenWith = ref(window.innerWidth);

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
