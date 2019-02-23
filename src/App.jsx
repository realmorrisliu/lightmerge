import React, { useState } from 'react';
import BranchSelector from './components/BranchSelector';
import StatusViewer from './components/StatusViewer';
import UserIcon from './avatar.jpeg';

import styles from './App.module.scss';

const branches = ['master', 'lightmerge', 'lym/chatroom', 'lym/group-chat', 'lym/video', 'feature/chatroom', 'feature/messagebox'];
const originSelectedBranches = ['lym/chatroom', 'lym/group-chat'];

const App = () => {
  const [selectedBranches, setSelectedBranches] = useState(originSelectedBranches);

  const handleBranchClick = (branchName) => {
    if (selectedBranches.includes(branchName)) {
      setSelectedBranches(selectedBranches.filter(branch => branch !== branchName));
    } else {
      setSelectedBranches(selectedBranches.concat(branchName));
    }
  };

  const isLightmergeAvailable = () => {
    if (selectedBranches.length === 0) {
      return false;
    }

    return true;
  };

  const runLightmerge = () => {
    console.log(selectedBranches);
  };

  return (
    <div className={styles.App}>
      <div className={styles.ActionBar}>
        <div className={styles.User}>
          <img alt="user avatar" className={styles.Avatar} src={UserIcon} />
        </div>
        <input className={styles.RepoPath} type="text" placeholder="Repository Path" />
        <button
          type="button"
          className={styles.Button}
          disabled={!isLightmergeAvailable()}
          onClick={runLightmerge}
        >
          lightmerge
        </button>
        <button type="button" className={styles.Button} disabled>deploy</button>
      </div>
      <div className={styles.Content}>
        <BranchSelector
          branchList={branches}
          alreadySelected={originSelectedBranches}
          onChange={handleBranchClick}
        />
        <StatusViewer selectedBranches={selectedBranches} logs="" />
      </div>
    </div>
  );
};

export default App;
