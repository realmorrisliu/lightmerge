import React, { useState, useEffect } from 'react';
import BranchSelector from './components/BranchSelector';
import StatusViewer from './components/StatusViewer';
import UserIcon from './avatar.jpeg';
import { getBranchList } from './controllers/Branch';

import styles from './App.module.scss';

const App = () => {
  const [branchList, setBranchList] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);

  useEffect(() => {
  });

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

  const handleRepoEnter = (e) => {
    if (e.key === 'Enter') {
      getBranchList(e.target.value, setBranchList);
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.ActionBar}>
        <div className={styles.User}>
          <img alt="user avatar" className={styles.Avatar} src={UserIcon} />
        </div>
        <input
          className={styles.RepoPath}
          type="text"
          placeholder="Repository Path"
          onKeyPress={handleRepoEnter}
        />
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
          branchList={branchList}
          alreadySelected={selectedBranches}
          onChange={handleBranchClick}
        />
        <StatusViewer selectedBranches={selectedBranches} logs="" />
      </div>
    </div>
  );
};

export default App;
