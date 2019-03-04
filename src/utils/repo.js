export default class Repo {
  constructor(path, base) {
    this.path = path;
    this.base = base;
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

  static getBase() {
    return this.instance ? this.instance.base : 'master';
  }

  static setBase(base) {
    if (!this.instance) {
      this.instance = new Repo('', base);
    }

    this.instance.base = base;
  }
}
