/* eslint-disable */
import { injectable } from 'inversify';
import { AxiosResponse } from 'axios';
import {
  ISignin, ISignup, ISigninRes, IMessageRes,
} from '@/utils/Type';
import { AbstractAuthenticationRepository } from './abstracts/AbstractAuthenticationRepository';
import { authenticationApi } from '../api/AuthenticationApi';

@injectable()
export class AuthenticationRepository implements AbstractAuthenticationRepository {
  async signin(data: ISignin): Promise<AxiosResponse<ISigninRes>> {
    return await authenticationApi.signin(data);
  }

  async signup(data: ISignup): Promise<AxiosResponse<IMessageRes>> {
    return await authenticationApi.signup(data);
  }

  async logout(): Promise<AxiosResponse<IMessageRes>> {
    return await authenticationApi.signOut();
  }
}
