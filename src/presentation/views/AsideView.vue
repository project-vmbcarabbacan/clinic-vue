<template>
  <v-navigation-drawer  absolute permanent>
    <!-- Navigation List -->
    <v-list
      class="d-flex flex-column"
      density="compact"
      nav
      style="height: 100%;
    ">
    <v-list-item
            prepend-avatar="@/presentation/assets/images/profile.png"
            :subtitle="user.username"
            :title="user.name"
            class="text-start"
          />
          <v-divider class="mb-6" />

      <!-- Main Navigation Items -->
       <template
        v-for="child in RouterChildren"
        :key="child.name"
       >
        <v-list-item
          v-if="child.meta.roles.includes(user.role) && child.show"
          :class="child.class"
          :title="child.name"
          :to="child.path"
        >
          <template v-slot:prepend>
            <v-icon :icon="child.icon"></v-icon>
          </template>
        </v-list-item>
      </template>

      <!-- Sign-Out at the Bottom -->
      <v-list-item
        title="Sign Out"
        @click="signOut"
        class="mt-auto"
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
import { useUserStore } from '../store/UserStore';

const authStore = useAuthenticationStore();
const userStore = useUserStore();
const router = useRouter();

const { user } = userStore;

const logout = inject('logout') as Logout;

async function signOut() {
  await authStore.logout(logout);
  router.push({ name: 'AthenticationSignin' });
}

</script>
