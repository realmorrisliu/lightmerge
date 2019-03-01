export default class Auth {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static getAuth() {
    return this.instance ? {
      username: this.instance.username,
      password: this.instance.password,
    } : undefined;
  }

  static setUsername(username) {
    if (!this.instance) {
      this.instance = new Auth(username, '');
    }

    this.instance.username = username;
  }

  static setPassword(password) {
    if (!this.instance) {
      this.instance = new Auth('', password);
    }

    this.instance.password = password;
  }
}
