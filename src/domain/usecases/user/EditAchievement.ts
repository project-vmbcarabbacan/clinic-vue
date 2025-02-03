/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractUserRepository } from '@/data/repositories/abstracts/AbstractUserRepository';
import { Achievement } from '@/domain/models/Achievement';
import { IAchievementUpdate } from '@/utils/Type';

@injectable()
export class EditAchievement {
  constructor(
    @inject('AbstractUserRepository') private userRepository: AbstractUserRepository,
  ) { }

  async execute(achievementData: IAchievementUpdate): Promise<void> {
    await this.userRepository.achievementEdit(achievementData);
  }
}
