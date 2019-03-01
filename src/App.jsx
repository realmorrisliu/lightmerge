import React from 'react';
import BranchSelector from './components/BranchSelector';
import StatusViewer from './components/StatusViewer';
import UserIcon from './avatar.jpeg';
import Repo from './utils/repo';
import {
  getBranchList,
  getSelectedBranchList,
  updateBranchLightmerge,
  getRecentRepos,
} from './controllers/Branch';

import styles from './App.module.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pathToRepo: '',
      lightmerged: false,
      branchList: [],
      recentRepos: [],
      selectedBranchList: [],
    };
  };

  componentDidMount() {
    getRecentRepos().then((recentRepos) => {
      this.setRecentRepos(recentRepos);
    });
  }

  setPathToRepo = (path) => {
    this.setState({ pathToRepo: path });
  };

  setLightmergeStatus = (status) => {
    this.setState({ lightmerged: status });
  };
  setBranchList = (list) => {
    this.setState({ branchList: list });
  };
  setRecentRepos = (list) => {
    this.setState({ recentRepos: list });
  };
  setSelectedBranchList = (list) => {
    this.setState({ selectedBranchList: list });
  };

  handleBranchClick = (branchName) => {
    const { selectedBranchList } = this.state;

    this.setLightmergeStatus(false);

    if (selectedBranchList.includes(branchName)) {
      this.setSelectedBranchList(selectedBranchList.filter(branch => branch !== branchName));
    } else {
      this.setSelectedBranchList(selectedBranchList.concat(branchName));
    }
  };

  isLightmergeAvailable = () => {
    const { selectedBranchList } = this.state;

    if (selectedBranchList.length === 0) {
      return false;
    }

    return true;
  };

  runLightmerge = () => {
    const { selectedBranchList } = this.state;

    updateBranchLightmerge(selectedBranchList, () => {
      this.setLightmergeStatus(true);
    });
  };

  searchRepo = async () => {
    const { pathToRepo } = this.state;

    Repo.setPath(pathToRepo);

    const tempSelected = await getSelectedBranchList();
    const branches = await getBranchList();
    const recent = await getRecentRepos();

    const selected = tempSelected.filter(item => branches.includes(item));
    this.setSelectedBranchList(selected);
    this.setBranchList(branches);
    this.setRecentRepos(recent);
  };

  handleRepoEnter = (e) => {
    if (e.key === 'Enter') {
      this.setLightmergeStatus(false);
      this.searchRepo();
    }
  };

  handlePathChange = (e) => {
    this.setPathToRepo(e.target.value);
    this.setLightmergeStatus(false);
    this.setBranchList([]);
    this.setSelectedBranchList([]);
  };

  handleRecentClicked = (repo) => {
    this.setPathToRepo(repo);
    this.setLightmergeStatus(false);
    this.setBranchList([]);
    this.setSelectedBranchList([]);
    this.refs.pathInput.focus();
  };

  render() {
    const { pathToRepo, lightmerged, recentRepos, branchList, selectedBranchList } = this.state;

    return (
      <div className={styles.App}>
        <div className={styles.ActionBar}>
          <div className={styles.User}>
            <img alt="user avatar" className={styles.Avatar} src={UserIcon} />
          </div>
          <input
            className={styles.RepoPath}
            type="text"
            ref="pathInput"
            placeholder="Repository Path"
            value={pathToRepo}
            onChange={this.handlePathChange}
            onKeyPress={this.handleRepoEnter}
          />

          <button
            type="button"
            className={styles.Button}
            disabled={!this.isLightmergeAvailable()}
            onClick={this.runLightmerge}
          >
            lightmerge
          </button>
          <button type="button" className={styles.Button} disabled={!lightmerged}>deploy</button>
        </div>

        <div className={styles.RecentRepos}>
          {
            recentRepos.map(repo => (
              <code>
                <button
                  type="button"
                  className={styles.Path}
                  onClick={() => this.handleRecentClicked(repo)}
                >
                  {repo}
                </button>
              </code>
            ))
          }
        </div>

        <div className={styles.Content}>
          <BranchSelector
            branchList={branchList}
            alreadySelected={selectedBranchList}
            onChange={this.handleBranchClick}
          />
          <StatusViewer selectedBranches={selectedBranchList} logs="" />
        </div>
      </div>
    );
  }
}
