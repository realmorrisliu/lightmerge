import React from 'react';
import BranchInfo from './BranchInfo';
import LogWindow from './LogWindow';
import './StatusViewer.scss';

const StatusViewer = (props) => {
  return (
    <div className="StatusViewer">
      <BranchInfo selectedBranches={props.selectedBranches} />
      <LogWindow />
    </div>
  );
};

export default StatusViewer;
