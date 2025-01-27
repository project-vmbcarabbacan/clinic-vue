/* eslint-disable */

import { defineStore } from 'pinia';
import { inject } from 'vue';
import { GetCurrentUser } from '@/domain/usecases/user/GetCurrentUser';
import Types from '@/utils/Types';
import { User } from '@/domain/models/User';

export const useUserStore = defineStore(Types.USER, {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async currentUser(getCurrentUser: GetCurrentUser) {
      this.loading = true;
      this.error = null;

      try {
        this.user = await getCurrentUser.execute();
        console.log({ user: this.user })
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },
  },
});
