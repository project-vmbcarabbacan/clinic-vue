<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-card class="pa-8" max-width="800" width="600">
      <!-- Card Header -->
      <v-card-title class="text-center text-h5">Welcome Back!</v-card-title>
      <v-card-subtitle class="text-center mb-4">
        Please sign in to your account to continue.
      </v-card-subtitle>

      <!-- Card Content -->
      <v-card-text>
        <!-- Sign-In Form -->
        <v-form ref="form" autocomplete="off" v-model="valid">
          <v-text-field
            v-model="signin.username"
            label="Username"
            type="username"
            :rules="[rules.username]"
            prepend-icon="mdi-email"
            block
            required
            autocomplete="off"
            class="align-left-error"
          ></v-text-field>

          <v-text-field
            v-model="signin.password"
            label="Password"
            :type="visible ? 'text' : 'password'"
            :rules="[rules.required]"
            prepend-icon="mdi-lock"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            block
            required
            autocomplete="new-password"
            @click:append-inner="visible = !visible"
            class="align-left-error"
          ></v-text-field>
          <span class="text-red">{{ authStore.error }}</span>
          <v-btn
            block
            small
            flat
            color="primary"
            class="mt-4"
            :disabled="!valid"
            @click="submit"
          >
            Sign In
          </v-btn>

          <!-- Forgot Password -->
          <!-- <v-btn text small class="mt-2" @click="forgotPassword">
            Forgot your password?
          </v-btn> -->
        </v-form>
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { useAuthenticationStore } from '@/presentation/store/AuthenticationStore';
import { Signin } from '@/domain/usecases/authentication/Signin';
import { useRouter } from 'vue-router';

const authStore = useAuthenticationStore();
const router = useRouter();

const { signin } = authStore;
const valid = ref(false);
const visible = ref(false);

const rules = {
  required: (value: string) => !!value || 'Field is required.',
  username: (value: string) => !!value || 'Username is required.',
};

const signIn = inject('signIn') as Signin;

const submit = async () => {
  if (signIn) {
    const user = await authStore.login(signin, signIn);
    if (!user) return;

    if (!authStore.error) router.push({ name: 'default' });
  }
};

</script>

<style>
/* Align errors to the left */
.align-left-error .v-messages__message {
  text-align: left;
}

.error-text {
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
  text-align: left;
}
</style>
