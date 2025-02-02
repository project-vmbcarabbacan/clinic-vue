/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractUserRepository } from '@/data/repositories/abstracts/AbstractUserRepository';
import { IUpdateUser } from '@/utils/Type';

@injectable()
export class UpdateData {
  constructor(
    @inject('AbstractUserRepository') private userRepository: AbstractUserRepository,
  ) { }

  async execute(userData: IUpdateUser): Promise<void> {
    await this.userRepository.update(userData);
  }
}
