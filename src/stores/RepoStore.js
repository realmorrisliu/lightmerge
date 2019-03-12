import {
  action,
  computed,
  observable,
  configure,
  runInAction,
} from 'mobx';
import {
  deploy,
  getBranchList,
  getRecentRepos,
  getSelectedBranchList,
  pullLatestCode,
  updateBranchLightmerge,
} from '../controllers/Branch';
import Status from '../utils/status';

configure({ enforceActions: 'always' });

export default class RepoStore {
  @observable path = '';

  @observable base = '';

  @observable branches = [];

  @observable branchesLoadingStatus = Status.UNLOAD;

  @observable recentRepos = [];

  @observable recentReposLoadingStatus = Status.UNLOAD;

  @observable selectedBranches = [];

  @observable selectedBranchesLoadingStatus = Status.UNLOAD;

  @observable lightmergeStatus = Status.UNLOAD;

  @observable deployStatus = Status.UNLOAD;

  @computed get deployEnabled() {
    return (
      this.lightmergeStatus === Status.SUCCESS
      && this.deployStatus !== Status.LOADING
    );
  }

  @computed get lightmergeEnabled() {
    return (
      this.lightmergeStatus !== Status.LOADING
      && this.deployStatus !== Status.LOADING
      && this.branchesLoadingStatus === Status.SUCCESS
      && this.recentReposLoadingStatus === Status.SUCCESS
      && this.selectedBranchesLoadingStatus === Status.SUCCESS
      && this.selectedBranches.length !== 0
    );
  }

  @computed get hasRunningAction() {
    return (
      this.branchesLoadingStatus === Status.LOADING
      || this.recentReposLoadingStatus === Status.LOADING
      || this.selectedBranchesLoadingStatus === Status.LOADING
      || this.lightmergeStatus === Status.LOADING
      || this.deployStatus === Status.LOADING
    );
  }

  @computed get isBranchesLoading() {
    return this.branchesLoadingStatus === Status.LOADING;
  }

  @action resetLightmerge = () => {
    this.lightmergeStatus = Status.UNLOAD;
  };

  @action resetDeploy = () => {
    this.deployStatus = Status.UNLOAD;
  };

  @action updatePath = (path) => {
    this.path = path;
    this.base = '';
    this.branches = [];
    this.branchesLoadingStatus = Status.UNLOAD;
    this.selectedBranches = [];
    this.selectedBranchesLoadingStatus = Status.UNLOAD;
    this.lightmergeStatus = Status.UNLOAD;
    this.deployStatus = Status.UNLOAD;
  };

  @action updateBase = (e) => {
    this.base = e.target.value;
  };

  @action updateSelectedBranches = (newList) => {
    this.selectedBranches = newList;
  };

  @action updateRecentRepos = async () => {
    this.recentReposLoadingStatus = Status.LOADING;

    try {
      const recent = await getRecentRepos();

      runInAction(() => {
        this.recentRepos = recent;
        this.recentReposLoadingStatus = Status.SUCCESS;
      });
    } catch (e) {
      runInAction(() => {
        this.recentReposLoadingStatus = Status.FAILED;
      });
    }
  };

  @action getRepoInfo = async () => {
    this.resetLightmerge();

    this.branchesLoadingStatus = Status.LOADING;
    this.selectedBranchesLoadingStatus = Status.LOADING;

    try {
      await pullLatestCode();
      await this.updateRecentRepos();
      const tempSelected = await getSelectedBranchList();
      const branches = await getBranchList();

      runInAction(() => {
        this.selectedBranches = tempSelected.filter(item => branches.includes(item));
        this.branches = branches;
        this.base = this.base || branches[0] || 'master';

        this.branchesLoadingStatus = Status.SUCCESS;
        this.selectedBranchesLoadingStatus = Status.SUCCESS;
      });
    } catch (e) {
      runInAction(() => {
        this.branchesLoadingStatus = Status.FAILED;
        this.selectedBranchesLoadingStatus = Status.FAILED;
      });
    }
  };

  @action lightmerge = async () => {
    this.lightmergeStatus = Status.LOADING;

    try {
      await updateBranchLightmerge(this.selectedBranches);
      runInAction(() => {
        this.lightmergeStatus = Status.SUCCESS;
      });
    } catch (e) {
      runInAction(() => {
        this.lightmergeStatus = Status.FAILED;
      });
    }
  };

  @action deploy = async () => {
    this.deployStatus = Status.LOADING;

    try {
      await deploy();
    } catch (e) {
      runInAction(() => {
        this.deployStatus = Status.FAILED;
      });
    }
  };
}
