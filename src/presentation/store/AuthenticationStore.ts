/* eslint-disable */
import { defineStore } from 'pinia';
import Types from '@/utils/Types';
import { Signin } from '@/domain/usecases/authentication/Signin';
import { Logout } from '@/domain/usecases/authentication/Logout';
import { ISignin } from '@/utils/Type';

export const useAuthenticationStore = defineStore(Types.AUTHENTICATION, {
  state: () => ({
    signin: {
      username: '',
      password: '',
    },
    error: '',
    loading: false,
  }),

  actions: {
    async login(credentials: ISignin, signin: Signin) {

      this.loading = true;

      try {
        this.error = '';
        return await signin.execute(credentials);
      } catch (err: any) {
        this.error = 'Invalid username and password'
        return err.response;
      } finally {
        this.loading = false
      }
    },

    async logout(logout: Logout) {
      try {
        await logout.execute();
        return true;
      } catch (err: any) {
        return err.response;
      }
    },
  },
});
