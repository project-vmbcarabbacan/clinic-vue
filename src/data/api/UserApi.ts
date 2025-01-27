/* eslint-disable */
import Urls from '@/utils/Urls';
import {
  ISignup, IUpdateUser, IChange, IAchievementAdd, IAchievementUpdate,
} from '@/utils/Type';
import apiClient from './axiosService';

export const userApi = {
  currentUser: async () => await apiClient.get(Urls.CURRENT),
  create: async (data: ISignup) => await apiClient.post(Urls.CREATE, data),
  update: async (data: IUpdateUser) => await apiClient.put(Urls.UPDATE, data),
  change: async (data: IChange, type: string) => await apiClient.patch(Urls.CHANGE(type), data),
  achievementAdd: async (data: IAchievementAdd) => await apiClient.post(Urls.ACHIEVEMENT_ADD, data),
  achievementEdit: async (data: IAchievementUpdate) => await apiClient.put(Urls.ACHIEVEMENT_EDIT, data),
};
