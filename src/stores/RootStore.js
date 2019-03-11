import LogStore from './LogStore';
import RepoStore from './RepoStore';

class RootStore {
  constructor() {
    this.log = new LogStore();
    this.repo = new RepoStore();
  }
}

export default new RootStore();
