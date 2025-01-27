/* eslint-disable */
import Urls from '@/utils/Urls';
import { ISignin, ISignup } from '@/utils/Type';
import apiClient from './axiosService';

export const authenticationApi = {
  signin: async (data: ISignin) => await apiClient.post(Urls.LOGIN, data),
  signup: async (data: ISignup) => await apiClient.post(Urls.SIGNUP, data),
  signOut: async () => await apiClient.get(Urls.LOGOUT()),
};
