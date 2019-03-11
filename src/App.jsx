import React from 'react';
import PropTypes from 'prop-types';
import DevTools from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';
import BranchSelector from './components/BranchSelector';
import StatusViewer from './components/StatusViewer';
import UserIcon from './avatar.jpeg';
import Auth from './utils/auth';

import styles from './App.module.scss';

@inject('store')
@observer
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
    };
  }

  componentDidMount() {
    const { store } = this.props;
    store.repo.updateRecentRepos();
  }

  setShowLogin = (show) => {
    this.setState({ showLogin: show });
  };

  handleRepoEnter = (e) => {
    if (e.key === 'Enter') {
      const { store } = this.props;
      store.repo.getRepoInfo();
    }
  };

  handleRecentClicked = (repo) => {
    const { store } = this.props;
    store.repo.updatePath(repo);

    this.pathInput.focus();
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
    const { store } = this.props;

    const {
      showLogin,
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
            value={store.repo.path}
            onChange={(e) => {
              store.repo.updatePath(e.target.value);
            }}
            onKeyPress={this.handleRepoEnter}
            disabled={store.repo.hasRunningAction}
          />

          <button
            type="button"
            className={styles.Button}
            disabled={!store.repo.lightmergeEnabled}
            onClick={store.repo.lightmerge}
          >
            lightmerge
          </button>
          <button
            type="button"
            className={styles.Button}
            disabled={!store.repo.deployEnabled}
            onClick={store.repo.deploy}
          >
            deploy
          </button>
        </div>

        <div className={styles.RecentRepos}>
          {
            store.repo.recentRepos.map(repo => (
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
          <BranchSelector />
          <StatusViewer />
        </div>

        <DevTools />
      </div>
    );
  }
}

App.wrappedComponent.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default App;
