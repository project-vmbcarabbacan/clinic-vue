/* eslint-disable */
import { inject, injectable } from 'inversify';
import { AbstractUserRepository } from '@/data/repositories/abstracts/AbstractUserRepository';
import { User } from '../../models/User';

@injectable()
export class GetCurrentUser {
  constructor(
    @inject('AbstractUserRepository') private userRepository: AbstractUserRepository,
  ) { }

  async execute(): Promise<User> {
    const userData = await this.userRepository.currentUser();
    return new User(
      userData.data.user._id,
      userData.data.user.name,
      userData.data.user.email,
      userData.data.user.username,
      userData.data.user.role,
      userData.data.user.status,
    );

  }
}
