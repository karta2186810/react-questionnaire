import { AuthUser } from '@/features/auth';

class Storage {
  private authUserKey = 'react_questionnaire_auth_user';

  getAuthUser(): AuthUser | null {
    const authUser = localStorage.getItem(this.authUserKey);

    if (!authUser) return null;

    try {
      return JSON.parse(authUser) as AuthUser;
    } catch (e) {
      return null;
    }
  }
  setAuthUser(user: AuthUser) {
    localStorage.setItem(this.authUserKey, JSON.stringify(user));
  }
  removeAuthUser() {
    localStorage.removeItem(this.authUserKey);
  }
}

export const storage = new Storage();
