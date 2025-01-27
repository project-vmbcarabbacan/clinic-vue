<template>
  <v-navigation-drawer>
    <!-- Navigation List -->
    <v-list class="d-flex flex-column" style="height: 100%;">
      <!-- Main Navigation Items -->
      <v-list-item
        v-for="child in RouterChildren"
        :key="child.name"
        :class="child.class"
        :title="child.name"
        :to="child.path"
      >
        <template v-slot:prepend>
          <v-icon :icon="child.icon"></v-icon>
        </template>
      </v-list-item>

      <!-- Sign-Out at the Bottom -->
      <v-list-item
        title="Sign Out"
        @click="signOut"
        class="text-error mt-auto"
      >
        <template #prepend>
          <v-icon>mdi-logout</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { RouterChildren } from '@/utils/RouterChildren';
import { Logout } from '@/domain/usecases/authentication/Logout';
import { useRouter } from 'vue-router';
import { useAuthenticationStore } from '../store/AuthenticationStore';

const authStore = useAuthenticationStore();
const router = useRouter();

const logout = inject('logout') as Logout;

async function signOut() {
  await authStore.logout(logout);
  router.push({ name: 'AthenticationSignin' });
}

</script>
