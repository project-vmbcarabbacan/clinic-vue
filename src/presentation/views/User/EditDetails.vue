<template>
  <v-app>
  <v-container class="pa-5">
    <v-card class="mx-auto" max-width="800" width="600">
      <v-row>
        <v-col cols="12" class="ma-4">
          <!-- Form -->
          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <!-- Name Field -->
            <v-text-field
              v-model="edit.name"
              label="Name"
              :rules="[rules.required]"
              required
          ></v-text-field>

          <v-text-field
            v-model="edit.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>

          <v-text-field
            v-model="edit.username"
            label="Username"
            :rules="[rules.required]"
            required
            disabled
          ></v-text-field>

          <template
            v-for="(num, index) in edit.contact_number"
            :key="index"
          >
            <v-text-field
              v-model.number="num.number"
              label="Contact Number"
              :rules="[rules.required]"
              required
              maxlength="12"
              @input="validateNumber(index)"
            ></v-text-field>
          </template>

          <v-text-field
            v-model="edit.title"
            label="Title"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <v-text-field
            v-model="edit.address"
            label="Address"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <v-text-field
            v-model="edit.biography"
            label="Biography"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <!-- Submit Button -->
          <v-btn
            :disabled="!valid"
            type="submit"
            color="primary"
            block
          >
            {{ updateLoader ? 'Loading...' : 'Submit' }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

    <!-- Form Data Display -->
    <v-row v-if="submittedData">
      <v-col cols="12">
        <v-card>
          <v-card-title>Form Submitted Data</v-card-title>
          <v-card-text>
            <pre>{{ submittedData }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    </v-card>
 </v-container>
</v-app>
 </template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { UpdateData } from '@/domain/usecases/user/UpdateData';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/UserStore';

const userStore = useUserStore();
const router = useRouter();

const valid = ref(false);
const submittedData = ref(false);
const { edit, update_loader: updateLoader, error } = userStore;
const updateData = inject('updateData') as UpdateData;

const rules = {
  required: (value: string) => !!value || 'Field is required.',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
  numeric: (value: string) => !!value || 'Username is required.',
};

async function submitForm() {
  await userStore.updateUserData(edit, updateData);
  if (error) return;

  router.go(-1);
}

function validateNumber(index: number) {
  // Ensure num.number is always a string
  let number = String(edit.contact_number[index].number);

  // Remove any non-numeric characters
  number = number.replace(/\D/g, '').slice(0, 12);

  // Update the value in edit.contact_number[index]
  edit.contact_number[index].number = number;
}
</script>
