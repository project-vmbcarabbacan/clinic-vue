/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractUserRepository } from '@/data/repositories/abstracts/AbstractUserRepository';
import { Achievement } from '../../models/Achievement';

@injectable()
export class GetAchievementById {
  constructor(
    @inject('AbstractUserRepository') private userRepository: AbstractUserRepository,
  ) { }

  async execute(achievementId: string): Promise<Achievement> {
    const achievementData = await this.userRepository.getAchievementById(achievementId);
    return new Achievement(
      achievementData.data._id!,
      achievementData.data.title,
      achievementData.data.description,
      achievementData.data.date,
    )
  }
}
