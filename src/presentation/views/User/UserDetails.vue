<template>
  <v-app>
    <v-container class="pa-5">
      <!-- User Card -->
      <v-card class="mx-auto" max-width="800" width="600">
        <v-card-title class="d-flex justify-center align-center">
          <!-- Centered Avatar -->
          <v-avatar size="120" class="mb-4">
            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User Avatar" />
          </v-avatar>
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
import { useUserStore } from '@/presentation/store/UserStore';

const userStore = useUserStore();

const { user } = userStore;

</script>
