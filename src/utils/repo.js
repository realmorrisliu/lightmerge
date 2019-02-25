export default class Repo {
  constructor(path) {
    this.path = path;
  }

  static getPath() {
    return this.instance ? this.instance.path : '';
  }

  static setPath(path) {
    if (!this.instance) {
      this.instance = new Repo(path);
    }

    this.instance.path = path;
  }
}
