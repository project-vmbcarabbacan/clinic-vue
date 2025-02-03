/* eslint-disable */
import Urls from '@/utils/Urls';
import {
  ISignup, IUpdateUser, IChange, IAchievementAdd, IAchievementUpdate,
} from '@/utils/Type';
import apiClient from './axiosService';

export const userApi = {
  currentUser: async () => {
    try {
      return await apiClient.get(Urls.CURRENT)
    } catch (error: any) {
      return error.response
    }
  },
  create: async (data: ISignup) => {
    try {
      return await apiClient.post(Urls.CREATE, data)
    } catch (error: any) {
      return error.response
    }
  },
  update: async (data: IUpdateUser) => {
    try {
      return await apiClient.put(Urls.UPDATE, data)
    } catch (error: any) {
      return error.response
    }
  },
  change: async (data: IChange, type: string) => {
    try {
      return await apiClient.patch(Urls.CHANGE(type), data)
    } catch (error: any) {
      return error.response
    }
  },
  achievementAdd: async (data: IAchievementAdd) => {
    try {
      return await apiClient.post(Urls.ACHIEVEMENT_ADD, data)
    } catch (error: any) {
      return error.response
    }
  },
  achievementEdit: async (data: IAchievementUpdate) => {
    try {
      return await apiClient.put(Urls.ACHIEVEMENT_EDIT, data)
    } catch (error: any) {
      return error.response
    }
  },
  getUserByUserId: async (userId: string) => {
    try {
      return await apiClient.get(Urls.GET_USER_ID(userId))
    } catch (error: any) {
      return error.response
    }
  },
  getAchievementById: async (userid: string, achievementId: string) => {
    try {
      return await apiClient.get(Urls.GET_ACHIEVEMENT_ID(userid, achievementId))
    } catch (error: any) {
      return error.response
    }
  }
};
