<template>
  <v-layout class="rounded rounded-md">
    <!-- Navigation Drawer -->
    <AsideView />

    <!-- Application Bar -->
    <v-app-bar title="Clinic"></v-app-bar>

    <!-- Main Content Area -->
    <v-main class="d-flex" style="min-height: 300px;">
      <router-view /> <!-- This will render the actual page content -->
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import AsideView from './AsideView.vue';
</script>

<style>
.mt-auto {
  margin-top: auto;
}
</style>
