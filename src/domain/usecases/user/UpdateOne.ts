/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractUserRepository } from '@/data/repositories/abstracts/AbstractUserRepository';
import { IChange } from '@/utils/Type';

@injectable()
export class UpdateOne {
  constructor(
    @inject('AbstractUserRepository') private userRepository: AbstractUserRepository,
  ) { }

  async execute(userData: IChange, type: string): Promise<void> {
    await this.userRepository.change(userData, type);
  }
}
