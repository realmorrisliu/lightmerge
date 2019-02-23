import React, { useState } from 'react';
import BranchSelector from './components/BranchSelector';
import StatusViewer from './components/StatusViewer';

import styles from './App.module.scss';

const branches = ['master', 'lightmerge', 'lym/chatroom', 'lym/group-chat', 'lym/video', 'feature/chatroom', 'feature/messagebox'];
const originSelectedBranches = ['lym/chatroom', 'feature/chatroom'];

const App = () => {
  const [selectedBranches, setSelectedBranches] = useState(originSelectedBranches);

  const handleBranchClick = (branchName) => {
    if (selectedBranches.includes(branchName)) {
      setSelectedBranches(selectedBranches.filter(branch => branch !== branchName));
    } else {
      setSelectedBranches(selectedBranches.concat(branchName));
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.Header}>user</header>
      <div className={styles.RepoPath}>
        <input className={styles.Input} type="text" placeholder="Repository Path" />
        <button type="button" className={styles.Button} disabled>lightmerge</button>
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
