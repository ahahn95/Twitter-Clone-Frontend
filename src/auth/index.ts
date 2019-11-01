export class Auth {
  static authenticateUser(token: string) {
    localStorage.setItem("jwt", token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem("jwt") !== null;
  }

  static deauthenticateUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("jwt");
      resolve();
    });
  }

  static getToken() {
    return localStorage.getItem("jwt");
  }
}
