/* eslint-disable */
import { defineStore } from 'pinia';
import Types from '@/utils/Types';
import { authenticationApi } from '@/data/api/AuthenticationApi';
import { Signin } from '@/domain/usecases/authentication/Signin';
import router from '../router';
import { ISignin } from '@/utils/Type';

export const useAuthenticationStore = defineStore(Types.AUTHENTICATION, {
  state: () => ({
    signin: {
      username: '',
      password: '',
    },
    loading: false,
  }),

  actions: {
    async login(credentials: ISignin, signin: Signin) {

      this.loading = true;

      try {
        await signin.execute(credentials);
        router.push({ name: 'home' });
        return true;
      } catch (err: any) {
        return err.response;
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await authenticationApi.signOut();
        router.push({ name: 'signin' });

        return true;
      } catch (err: any) {
        return err.response;
      }
    },
  },
});
