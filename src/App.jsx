import React, { useState, useEffect } from 'react';
import BranchSelector from './components/BranchSelector';
import StatusViewer from './components/StatusViewer';
import UserIcon from './avatar.jpeg';
import { getBranchList, getSelectedBranchList } from './controllers/Branch';

import styles from './App.module.scss';

const App = () => {
  const [branchList, setBranchList] = useState([]);
  const [selectedBranchList, setSelectedBranchList] = useState([]);

  useEffect(() => {
  });

  const handleBranchClick = (branchName) => {
    if (selectedBranchList.includes(branchName)) {
      setSelectedBranchList(selectedBranchList.filter(branch => branch !== branchName));
    } else {
      setSelectedBranchList(selectedBranchList.concat(branchName));
    }
  };

  const isLightmergeAvailable = () => {
    if (selectedBranchList.length === 0) {
      return false;
    }

    return true;
  };

  const runLightmerge = () => {
    console.log(selectedBranchList);
  };

  const handleRepoEnter = (e) => {
    if (e.key === 'Enter') {
      getBranchList(e.target.value, setBranchList);
      getSelectedBranchList(e.target.value, setSelectedBranchList);
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
          alreadySelected={selectedBranchList}
          onChange={handleBranchClick}
        />
        <StatusViewer selectedBranches={selectedBranchList} logs="" />
      </div>
    </div>
  );
};

export default App;
