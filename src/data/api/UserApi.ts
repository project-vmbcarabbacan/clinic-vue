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
  achievementAdd: async (data: IAchievementAdd) => {
    try {
      await apiClient.post(Urls.ACHIEVEMENT_ADD, data)
    } catch (error: any) {
      return error.response
    }
  },
  achievementEdit: async (data: IAchievementUpdate) => {
    try {
      await apiClient.put(Urls.ACHIEVEMENT_EDIT, data)
    } catch (error: any) {
      return error.response
    }
  },
  getUserByUserId: async (userId: string) => await apiClient.get(Urls.GET_USER_ID(userId)),
};
