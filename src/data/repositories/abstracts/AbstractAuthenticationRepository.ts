/* eslint-disable */
import {
  ISignin, ISignup, ISigninRes, IMessageRes,
} from '@/utils/Type';
import { AxiosResponse } from 'axios';

export abstract class AbstractAuthenticationRepository {
  /**
   * Sign in user.
   * @param data
   * @type ISignin
   * @returns ISigninRes
   */
  abstract signin(data: ISignin): Promise<AxiosResponse<ISigninRes>>;

  /**
   * Sign up new user.
   * @param data
   * @type ISignup
   * @returns IMessageRes
   */
  abstract signup(data: ISignup): Promise<AxiosResponse<IMessageRes>>;

  /**
   * Sign out user.
   * @param data
   * @type ISignup
   * @returns IMessageRes
   */
  abstract logout(): Promise<AxiosResponse<IMessageRes>>;
}
