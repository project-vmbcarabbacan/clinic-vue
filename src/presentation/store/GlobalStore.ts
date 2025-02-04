/* eslint-disable */

import { defineStore } from 'pinia';
import Types from '@/utils/Types';

export const useGlobalStore = defineStore(Types.GLOBAL, {
  state: () => ({
    snackbar: false,
    message: '',
  }),

  actions: {
    updateData(snackbar: boolean, message: string) {
      this.snackbar = snackbar;
      this.message = message;

      setTimeout(() => {
        this.$reset();
      }, 1500);
    }
  }
});
