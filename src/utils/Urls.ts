import { useUserStore } from '@/presentation/store/UserStore';

export default class Urls {
  /* secure */
  static readonly LOGIN: string = '/secure/login';

  static LOGOUT(): string {
    const userStore = useUserStore();
    const userId = userStore.user?.id;
    if (userId) return `/secure/logout/${userId}`;

    return '';
  }

  static readonly SIGNUP: string = '/secure/signup';

  /* user */
  static readonly CURRENT: string = '/user/current-user';

  static readonly CREATE: string = '/user/create';

  static readonly ACHIEVEMENT_ADD: string = '/user/achievement-add';

  static readonly ACHIEVEMENT_EDIT: string = '/user/achievement-edit';

  static readonly UPDATE: string = '/user/update';

  static CHANGE(type: string): string {
    if (!type) throw new Error('Type parameter is required');

    return `/user/change-${type}`;
  }

  static GET_USER_ID(userId: string): string {
    if (!userId) throw new Error('User id parameter is required');

    return `/user/user-by-id/${userId}`;
  }

  static GET_ACHIEVEMENT_ID(achievementId: string): string {
    if (!achievementId) throw new Error('Achievement id parameter is required');

    return `/user/achievement-by-id/${achievementId}`;
  }
}
