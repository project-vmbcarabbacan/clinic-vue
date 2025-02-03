/* eslint-disable */
import { App, provide } from 'vue';
import { Container } from 'inversify';

/* abstracts */
import { AbstractUserRepository } from '@/data/repositories/abstracts/AbstractUserRepository';
import { AbstractAuthenticationRepository } from '@/data/repositories/abstracts/AbstractAuthenticationRepository';

/* repositories */
import { UserRepository } from '@/data/repositories/UserRepository';
import { AuthenticationRepository } from '@/data/repositories/AuthenticationRepository';

/* usecases */
import { GetCurrentUser } from '@/domain/usecases/user/GetCurrentUser';
import { GetUserById } from '@/domain/usecases/user/GetUserById';
import { UpdateData } from '@/domain/usecases/user/UpdateData';
import { AddAchievement } from '@/domain/usecases/user/AddAchievement';
import { EditAchievement } from '@/domain/usecases/user/EditAchievement';
import { Signin } from '@/domain/usecases/authentication/Signin';
import { Logout } from '@/domain/usecases/authentication/Logout';
import { GetAchievementById } from '@/domain/usecases/user/GetAchievementById';

const container = new Container();

container.bind<AbstractUserRepository>('AbstractUserRepository').to(UserRepository);
container.bind<AbstractAuthenticationRepository>('AbstractAuthenticationRepository').to(AuthenticationRepository);
container.bind<GetCurrentUser>(GetCurrentUser).toSelf();
container.bind<GetUserById>(GetUserById).toSelf();
container.bind<UpdateData>(UpdateData).toSelf();
container.bind<AddAchievement>(AddAchievement).toSelf();
container.bind<EditAchievement>(EditAchievement).toSelf();
container.bind<GetAchievementById>(GetAchievementById).toSelf();
container.bind<Signin>(Signin).toSelf();
container.bind<Logout>(Logout).toSelf();


function provideDependencies(app: App) {

  const signInInstance = container.get<Signin>(Signin);
  const getCurrentUserInstance = container.get<GetCurrentUser>(GetCurrentUser);
  const getUserByIdInstance = container.get<GetUserById>(GetUserById);
  const updateDataInstance = container.get<UpdateData>(UpdateData);
  const addAchievementInstance = container.get<AddAchievement>(AddAchievement);
  const editAchievementInstance = container.get<EditAchievement>(EditAchievement);
  const getAchievementByIdInstance = container.get<GetAchievementById>(GetAchievementById);
  const LogoutInstance = container.get<Logout>(Logout);

  app.provide('signIn', signInInstance);
  app.provide('getCurrentUser', getCurrentUserInstance);
  app.provide('getUserById', getUserByIdInstance);
  app.provide('logout', LogoutInstance);
  app.provide('updateData', updateDataInstance);
  app.provide('addAchievement', addAchievementInstance);
  app.provide('editAchievement', editAchievementInstance);
  app.provide('getAchievementById', getAchievementByIdInstance);
}

export { container, provideDependencies };
