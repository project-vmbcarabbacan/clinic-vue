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
import { Signin } from '@/domain/usecases/authentication/Signin';
import { Logout } from '@/domain/usecases/authentication/Logout';

const container = new Container();

container.bind<AbstractUserRepository>('AbstractUserRepository').to(UserRepository);
container.bind<AbstractAuthenticationRepository>('AbstractAuthenticationRepository').to(AuthenticationRepository);
container.bind<GetCurrentUser>(GetCurrentUser).toSelf();
container.bind<Signin>(Signin).toSelf();
container.bind<Logout>(Logout).toSelf();


function provideDependencies(app: App) {

  const signInInstance = container.get<Signin>(Signin);
  const getCurrentUserInstance = container.get<GetCurrentUser>(GetCurrentUser);
  const LogoutInstance = container.get<Logout>(Logout);

  app.provide('signIn', signInInstance);
  app.provide('getCurrentUser', getCurrentUserInstance);
  app.provide('logout', LogoutInstance);
}

export { container, provideDependencies };
