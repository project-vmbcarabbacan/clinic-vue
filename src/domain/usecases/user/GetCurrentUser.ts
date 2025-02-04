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
      userData.data.user.information.title,
      userData.data.user.information.status_type,
      userData.data.user.information.address,
      userData.data.user.information.biography,
      userData.data.user.information.contact_number,
      userData.data.user.achievements,
      userData.data.user.image,
    );

  }
}
