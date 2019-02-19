import React from 'react';
import Branch from './components/Branch/Branch';

import './App.scss';

const branches = ['master', 'lightmerge', 'lym/chatroom', 'feature/chatroom', 'feature/messagebox'];

const App = () => (
  <div className="App">
    <header className="Header">
      <code>lightmerge</code>
    </header>
    <div className="Content">
      <Branch
        branchList={[]}
      />
    </div>
  </div>
);

export default App;
