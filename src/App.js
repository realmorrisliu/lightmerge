import React, { useState } from 'react';
import Branch from './components/BranchSelector';

import './App.scss';

const branches = ['master', 'lightmerge', 'lym/chatroom', 'feature/chatroom', 'feature/messagebox'];
const originSelectedBranches: Array<string> = ['lightmerge', 'feature/chatroom'];

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
    <div className="App">
      <header className="Header">
        <code>lightmerge</code>
      </header>
      <div className="Content">
        <Branch
          branchList={branches}
          alreadySelected={originSelectedBranches}
          onChange={handleBranchClick}
        />
      </div>
    </div>
  );
};

export default App;
