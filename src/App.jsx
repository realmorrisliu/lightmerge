import React, { useState } from 'react';
import BranchSelector from './components/BranchSelector';
import StatusViewer from './components/StatusViewer';

import './App.scss';

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
    <div className="App">

      <div className="RepoPath">
        <input className="Input" type="text" placeholder="Repository Path" />
        <button type="button" className="Button" disabled>lightmerge</button>
      </div>
      <div className="Content">
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
