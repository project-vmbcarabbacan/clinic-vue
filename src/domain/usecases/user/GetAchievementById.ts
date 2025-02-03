/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractUserRepository } from '@/data/repositories/abstracts/AbstractUserRepository';
import { Achievement } from '../../models/Achievement';
import moment from 'moment';

@injectable()
export class GetAchievementById {
  constructor(
    @inject('AbstractUserRepository') private userRepository: AbstractUserRepository,
  ) { }

  async execute(userid: string, achievementId: string): Promise<Achievement> {
    const achievementData = await this.userRepository.getAchievementById(userid, achievementId);
    return new Achievement(
      achievementData.data.achievement._id!,
      achievementData.data.achievement.user_id,
      achievementData.data.achievement.title,
      achievementData.data.achievement.description,
      moment(achievementData.data.achievement.date).format('YYYY-MM-DD'),
    )
  }
}
