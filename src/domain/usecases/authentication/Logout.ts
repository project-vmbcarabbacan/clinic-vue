/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractAuthenticationRepository } from '@/data/repositories/abstracts/AbstractAuthenticationRepository';
import { AxiosResponse } from 'axios';
import { IMessageRes } from '@/utils/Type';

@injectable()
export class Logout {
  constructor(
    @inject('AbstractAuthenticationRepository') private authenticationRepository: AbstractAuthenticationRepository,
  ) { }

  async execute(): Promise<AxiosResponse<IMessageRes>> {
    return await this.authenticationRepository.logout();
  }
}
