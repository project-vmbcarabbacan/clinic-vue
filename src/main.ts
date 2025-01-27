/* eslint-disable */
import 'reflect-metadata';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { provideDependencies } from './di/container';

import App from './App.vue';
import router from './presentation/router';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})


const app = createApp(App);

provideDependencies(app);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount('#app');
