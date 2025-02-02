/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractUserRepository } from '@/data/repositories/abstracts/AbstractUserRepository';
import { IAchievementAdd } from '@/utils/Type';

@injectable()
export class AddAchievement {
  constructor(
    @inject('AbstractUserRepository') private userRepository: AbstractUserRepository,
  ) { }

  async execute(userData: IAchievementAdd): Promise<void> {
    await this.userRepository.achievementAdd(userData);
  }
}
