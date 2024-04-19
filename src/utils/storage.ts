class Storage {
  private authTokenKey = 'react_questionnaire_auth_token';

  getAuthToken() {
    return localStorage.getItem(this.authTokenKey);
  }
  setAuthToken(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }
  removeAuthToken() {
    localStorage.removeItem(this.authTokenKey);
  }
}

export const storage = new Storage();
