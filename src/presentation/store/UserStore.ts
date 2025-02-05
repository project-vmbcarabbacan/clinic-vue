/* eslint-disable */

import { defineStore } from 'pinia';
import { GetCurrentUser } from '@/domain/usecases/user/GetCurrentUser';
import { GetUserById } from '@/domain/usecases/user/GetUserById';
import { GetAchievementById } from '@/domain/usecases/user/GetAchievementById';
import Types from '@/utils/Types';
import { IUpdateUser, IAchievementAdd, IAchievementUpdate, IChange } from '@/utils/Type';
import { User } from '@/domain/models/User';
import { Achievement } from '@/domain/models/Achievement';
import { UpdateData } from '@/domain/usecases/user/UpdateData';
import { AddAchievement } from '@/domain/usecases/user/AddAchievement';
import { EditAchievement } from '@/domain/usecases/user/EditAchievement';
import { UpdateOne } from '@/domain/usecases/user/UpdateOne';
import moment from 'moment';

export const useUserStore = defineStore(Types.USER, {
  state: () => ({
    user: {} as User,
    edit: {} as User,
    achievement: {
      user_id: '',
      title: '',
      description: '',
      date: '',
      image: null,
    } as Achievement,
    loading: false,
    error: null as string | null,
    has_error: false,
    update_loader: false
  }),

  actions: {
    async currentUser(getCurrentUser: GetCurrentUser) {
      this.loading = true;
      this.error = null;

      try {
        this.user = await getCurrentUser.execute();
        if (this.user.achievements.length > 0) {
          this.user.achievements = this.user.achievements.map(achivement => {
            const id = achivement._id;
            delete achivement._id;
            return {
              ...achivement,
              id,
              date: moment(achivement.date).format('YYYY-MM-DD')
            }
          })
        }
        return this.user;
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async getUserById(user_id: string, getUserById: GetUserById) {
      this.loading = true;
      this.has_error = false;
      try {
        let response = await getUserById.execute(user_id);
        if (response.contact_number.length === 0) response.contact_number.push({ number: '' })
        if (response.achievements.length > 0) {
          response.achievements = response.achievements.map(achivement => {
            const id = achivement._id;
            delete achivement._id;
            return {
              ...achivement,
              id
            }
          })
        }

        this.edit = response;
        return response;
      } catch (err) {
        this.has_error = true;
      } finally {
        this.loading = false;
      }
    },

    async getAchievementById(user_id: string, achievement_id: string, getAchievementById: GetAchievementById) {
      this.loading = true;
      this.has_error = false;
      try {
        let response = await getAchievementById.execute(user_id, achievement_id);
        this.achievement = response;
        return response;
      } catch (error) {
        this.has_error = true;
      } finally {
        this.loading = false;
      }
    },

    async updateUserData(data: IUpdateUser, updateData: UpdateData) {
      this.update_loader = true;
      this.error = null;

      try {
        await updateData.execute(data);
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.update_loader = false;
      }

    },

    async updateOneUser(data: IChange, type: string, updateOne: UpdateOne) {
      this.update_loader = true;
      this.error = null;

      try {
        await updateOne.execute(data, type);
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.update_loader = false;
      }

    },

    async addAchievement(data: IAchievementAdd, addAchievement: AddAchievement) {
      this.update_loader = true;
      this.error = null;

      try {
        await addAchievement.execute(data);
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.update_loader = false;
      }
    },

    async editAchievement(data: IAchievementUpdate, editAchievement: EditAchievement) {
      this.update_loader = true;
      this.error = null;

      try {
        await editAchievement.execute(data);
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.update_loader = false;
      }
    },

    updateData(data: { email: string, image: string, name: string, status: string, username: string }) {
      this.user.email = data.email;
      this.user.image = data.image;
      this.user.name = data.name;
      this.user.status = data.status;
      this.user.username = data.username;
    }

  },
});
