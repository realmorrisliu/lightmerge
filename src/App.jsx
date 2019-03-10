import React from 'react';
import BranchSelector from './components/BranchSelector';
import StatusViewer from './components/StatusViewer';
import UserIcon from './avatar.jpeg';
import Repo from './utils/repo';
import Auth from './utils/auth';
import {
  getBranchList,
  getSelectedBranchList,
  updateBranchLightmerge,
  getRecentRepos,
  pullLatestCode,
  deploy,
} from './controllers/Branch';

import styles from './App.module.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: '',
      pathToRepo: '',
      lightmerged: false,
      showLogin: true,
      branchList: [],
      recentRepos: [],
      selectedBranchList: [],
    };
  }

  componentDidMount() {
    getRecentRepos().then((recentRepos) => {
      this.setRecentRepos(recentRepos);
    });
  }

  setPathToRepo = (path) => {
    this.setState({ pathToRepo: path });
  };

  setLogs = (logs) => {
    this.setState({ logs });
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

  setShowLogin = (show) => {
    this.setState({ showLogin: show });
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

    return selectedBranchList.length !== 0;
  };

  runLightmerge = async () => {
    const { selectedBranchList } = this.state;

    const error = await updateBranchLightmerge(selectedBranchList);
    if (error) {
      this.setLogs(error);
    } else {
      this.setLogs('lightmerge succeeded');
      this.setLightmergeStatus(true);
    }
  };

  deployLightmerge = async () => {
    const { error, stdout, stderr } = await deploy();
    this.setLogs(error || stdout || stderr);
  };

  searchRepo = async () => {
    const { pathToRepo } = this.state;

    Repo.setPath(pathToRepo);

    const error = await pullLatestCode();
    if (error) {
      this.setLogs(error);
    }

    const tempSelected = await getSelectedBranchList();
    const branches = await getBranchList();
    const recent = await getRecentRepos();

    const selected = tempSelected.filter(item => branches.includes(item));
    this.setSelectedBranchList(selected);
    this.setBranchList(branches);
    this.setRecentRepos(recent);
    Repo.setBase(Repo.getBase() || branches[0] || 'master');
  };

  handleRepoEnter = (e) => {
    if (e.key === 'Enter') {
      this.setLightmergeStatus(false);
      this.searchRepo();
    }
  };

  handlePathChange = (e) => {
    this.setPathToRepo(e.target.value);
    this.resetState();
  };

  handleRecentClicked = (repo) => {
    this.setPathToRepo(repo);
    this.resetState();
    this.pathInput.focus();
  };

  resetState = () => {
    this.setLogs('');
    this.setLightmergeStatus(false);
    this.setBranchList([]);
    this.setSelectedBranchList([]);
  };

  handleUsernameInput = (e) => {
    Auth.setUsername(e.target.value);
  };

  handlePasswordInput = (e) => {
    Auth.setPassword(e.target.value);
  };

  handleLogin = () => {
    if (Auth.getAuth()) {
      this.setShowLogin(false);
    }
  };

  startLogin = () => {
    this.setShowLogin(true);
  };

  render() {
    const {
      pathToRepo, lightmerged, recentRepos, branchList, selectedBranchList, logs, showLogin,
    } = this.state;

    return (
      <div className={styles.App}>
        {
          showLogin
            ? (
              <div className={styles.AuthModal}>
                <div className={styles.Modal}>
                  <span className={styles.Title}>Login</span>
                  <input
                    className={styles.Input}
                    type="text"
                    onChange={this.handleUsernameInput}
                    placeholder="Username"
                  />
                  <input
                    className={styles.Input}
                    type="password"
                    onChange={this.handlePasswordInput}
                    placeholder="Password"
                  />
                  <button type="button" className={styles.Button} onClick={this.handleLogin}>OK</button>
                </div>
              </div>
            )
            : null
        }

        <div className={styles.ActionBar}>
          <button type="button" className={styles.User} onClick={this.startLogin}>
            <img alt="user avatar" className={styles.Avatar} src={UserIcon} />
          </button>
          <input
            className={styles.RepoPath}
            type="text"
            ref={(c) => {
              this.pathInput = c;
            }}
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
          <button
            type="button"
            className={styles.Button}
            disabled={!lightmerged}
            onClick={this.deployLightmerge}
          >
            deploy
          </button>
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
          <StatusViewer selectedBranches={selectedBranchList} logs={logs} branchList={branchList} />
        </div>
      </div>
    );
  }
}

export default App;
