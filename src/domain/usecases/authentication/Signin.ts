/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractAuthenticationRepository } from '@/data/repositories/abstracts/AbstractAuthenticationRepository';
import { ISignin, ISigninRes } from '@/utils/Type';
import { AxiosResponse } from 'axios';

@injectable()
export class Signin {
  constructor(
    @inject('AbstractAuthenticationRepository') private authenticationRepository: AbstractAuthenticationRepository,
  ) { }

  async execute(data: ISignin): Promise<AxiosResponse<ISigninRes>> {
    return await this.authenticationRepository.signin(data);
  }
}
