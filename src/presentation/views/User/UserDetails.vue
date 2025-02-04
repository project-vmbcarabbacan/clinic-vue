<template>
  <v-app>
    <v-container class="pa-5">
      <!-- User Card -->
      <v-card class="mx-auto" max-width="800" width="600">
        <v-card-title class="d-flex justify-center align-center">
          <!-- Centered Avatar -->
          <v-avatar size="120" class="mb-4" @click="openFile">
            <v-img :src="user.image" alt="User Avatar" cover />
          </v-avatar>
          <v-file-input
            style="display: none;"
            v-model="imageFile"
            label="Upload File"
            accept=".jpg,.jpeg,.png,.pdf"
            required
            show-size
            hint="Only .jpg, .jpeg, .png, and .pdf files are allowed."
            id="fileInput"
            @update:modelValue="convertToBase64"
            ref="imageUpload"
          ></v-file-input>
        </v-card-title>

        <!-- User Name and Position -->
        <v-card-subtitle class="text-center">
          <div class="text-h5"> {{ user.name }}</div>
          <div class="text-body-1">{{ user.title }}</div>
        </v-card-subtitle>

        <!-- About Section -->
        <v-card-text>
          <v-row class="mb-5">
            <v-col cols="12" sm="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Phone</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.contact_number.map(contact => contact.number).join(', ') }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <div class="text-body-2">
            <strong>About:</strong>
            <p>
              {{ user.biography }}
            </p>
          </div>

          <!-- Achievements Section -->
          <div class="mt-5">
            <v-hover v-slot:default="{ isHovering, props }">
              <strong v-bind="props">Achievements:
                <v-btn
                  v-if="isHovering"
                  density="compact"
                  icon="mdi-plus"
                  :to="{name: 'AchievemtnAdd', params: { user_id: user.id } }"
                  size="small"
                />
            </strong>
            </v-hover>
            <v-list>
              <template
                v-for="achievement in user.achievements"
                :key="achievement.id"
              >
                <v-hover v-slot:default="{ isHovering, props }">
                <v-list-item v-bind="props">
                  <v-list-item-content>
                    <v-list-item-title>
                      <strong>{{ achievement.title }}</strong> - {{ achievement.date }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ achievement.description }} <v-btn
                  v-if="isHovering"
                  density="compact"
                  icon="mdi-pencil"
                  :to="{name: 'AchievemtnEdit',
                    params: { user_id: user.id, achievement_id: achievement.id! }
                  }"
                  size="small"
                /></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-hover>
              </template>
            </v-list>
          </div>
        </v-card-text>

        <!-- Action Button -->
        <v-card-actions class="justify-center">
          <v-btn
            color="primary"
            :to="{name: 'UserEdit', params: { user_id: user.id } }">
            Edit Profile
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useUserStore } from '@/presentation/store/UserStore';
import { useGlobalStore } from '@/presentation/store/GlobalStore';
import { UpdateOne } from '@/domain/usecases/user/UpdateOne';

const userStore = useUserStore();
const globalStore = useGlobalStore();
const imageFile = ref(null); // Flag to check if form is submitted
const imageUpload = ref();
const { user } = userStore;

function openFile() {
  imageUpload.value.click();
}

const updateOne = inject('updateOne') as UpdateOne;

async function uploadFile(file: string) {
  await userStore.updateOneUser({ value: file, id: user.id }, 'image', updateOne);
}

async function convertToBase64(file: File) {
  if (!file) return;

  const reader = new FileReader();
  const size = file.size / 1024 / 1024; // to get mb
  if (size <= 2) {
    reader.onloadend = async () => uploadFile(reader.result); // Remove data URL prefix
    reader.readAsDataURL(file);
  } else {
    imageFile.value = null;
    globalStore.updateData(true, 'Image size must be less than 2mb');
    imageUpload.value.reset();
  }
}

</script>
