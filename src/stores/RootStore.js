import LogStore from './LogStore';
import RepoStore from './RepoStore';

export default class RootStore {
  constructor() {
    this.log = new LogStore();
    this.repo = new RepoStore();
  }
}
