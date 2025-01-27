/* eslint-disable */
import {
  ISignup, IUpdateUser, IAchievementAdd, IAchievementUpdate, IChange, IUserRes, IMessageRes,
} from '@/utils/Type';
import { AxiosResponse } from 'axios';

export abstract class AbstractUserRepository {
  /**
   * Get current user.
   * @returns IUserRes
   */
  abstract currentUser(): Promise<AxiosResponse<IUserRes>>;

  /**
     * Create new user.
     * @param data
     * @type ISignup
     * @returns IMessageRes
     */
  abstract create(data: ISignup): Promise<AxiosResponse<IUserRes>>;

  /**
     * Update user.
     * @param data
     * @type IUpdateUser
     * @returns IMessageRes
     */
  abstract update(data: IUpdateUser): Promise<AxiosResponse<IMessageRes>>;

  /**
     * change one field of user.
     * @param data
     * @type IChange
     * @returns IMessageRes
     */
  abstract change(data: IChange, type: string): Promise<AxiosResponse<IMessageRes>>;

  /**
     * Add achievement of the user
     * @param data
     * @type IAchievementAdd
     * @returns IMessageRes
     */
  abstract achievementAdd(data: IAchievementAdd): Promise<AxiosResponse<IMessageRes>>;

  /**
     * Update achievement of the user
     * @param data
     * @type IAchievementUpdate
     * @returns IMessageRes
     */
  abstract achievementEdit(data: IAchievementUpdate): Promise<AxiosResponse<IMessageRes>>;
}
