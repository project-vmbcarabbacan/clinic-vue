/* eslint-disable */
import { injectable } from 'inversify';
import { AxiosResponse } from 'axios';
import {
  ISignup, IUpdateUser, IAchievementAdd, IAchievementUpdate, IChange, IUserRes, IMessageRes,
  Achievement,
} from '@/utils/Type';
import { AbstractUserRepository } from './abstracts/AbstractUserRepository';
import { userApi } from '../api/UserApi';

@injectable()
export class UserRepository implements AbstractUserRepository {

  async currentUser(): Promise<AxiosResponse<IUserRes>> {
    return await userApi.currentUser();
  }

  async create(data: ISignup): Promise<AxiosResponse<IUserRes>> {
    return await userApi.create(data);
  }

  async update(data: IUpdateUser): Promise<void> {
    await userApi.update(data);
  }

  async change(data: IChange, type: string): Promise<AxiosResponse<IMessageRes>> {
    return await userApi.change(data, type);
  }

  async achievementAdd(data: IAchievementAdd): Promise<AxiosResponse<IMessageRes>> {
    return await userApi.achievementAdd(data);
  }

  async achievementEdit(data: IAchievementUpdate): Promise<AxiosResponse<IMessageRes>> {
    return await userApi.achievementEdit(data);
  }

  async getUserByUserId(type: string): Promise<AxiosResponse<IUserRes>> {
    return await userApi.getUserByUserId(type);
  }

  async getAchievementById(achievementId: string): Promise<AxiosResponse<Achievement>> {
    return await userApi.getAchievementById(achievementId);
  }
}
