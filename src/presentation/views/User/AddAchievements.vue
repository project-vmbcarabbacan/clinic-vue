<template>
  <v-container>
    <!-- Form -->
    <v-form v-model="valid" ref="form" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="achievement.title"
        label="Title"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-textarea
        v-model="achievement.description"
        label="Description"
        :rules="[rules.required]"
        required
      ></v-textarea>

      <v-text-field
        v-model="achievement.date"
        label="Select a Date"
        :rules="[rules.required]"
        required
        readonly
        append-icon="mdi-calendar"
        @click:append="menu = !menu"
      ></v-text-field>

      <v-menu v-model="menu" :close-on-content-click="false" max-width="290px" min-width="290px">
        <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
      </v-menu>

      <!-- File Upload Field -->
      <v-file-input
        v-model="imageFile"
        label="Upload File"
        accept=".jpg,.jpeg,.png,.pdf"
        :rules="[rules.required]"
        required
        show-size
        hint="Only .jpg, .jpeg, .png, and .pdf files are allowed."
        id="fileInput"
        @update:modelValue="convertToBase64"
      ></v-file-input>

      <!-- Submit Button -->
      <v-btn type="submit" color="primary" :disabled="!valid">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
/* eslint-disable */
import {
  onMounted, ref, watch, inject,
} from 'vue';
import { useDate } from 'vuetify';
import { useRoute } from 'vue-router';
import moment from 'moment';
import { useRouter } from 'vue-router';

const route = useRoute();
const adapter = useDate();
const valid = ref(false); // Track form validity
const achievement = ref({
  user_id: route.params.user_id.toString(),
  title: '',
  description: '',
  date: '',
  image: null, // Store the file
});
const router = useRouter();
const date = ref('');
const menu = ref(false);
const imageFile = ref(null); // Flag to check if form is submitted

// Validation rules
const rules = {
  required: (value) => !!value || 'This field is required.',
  email: (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(value) || 'Enter a valid email.';
  },
};

// eslint-disable-next-line no-undef
watch(() => date.value, (newDate) => {
  achievement.value.date = moment(newDate).format('YYYY-MM-DD');
});

onMounted(() => {
  date.value = adapter.parseISO(moment().format('YYYY-MM-DD'));
});

const addAchievement = inject('addAchievement');

async function handleSubmit() {
    await addAchievement.execute(achievement.value);
    router.go(-1);
}

async function convertToBase64(file) {
      const reader = new FileReader();
      reader.onloadend = async() => {
        achievement.value.image = reader.result
        return reader.result.split(',')[1]; // Remove data URL prefix
      };
      reader.readAsDataURL(file);
    }

</script>
