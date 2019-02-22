import React from 'react';
import BranchInfo from './BranchInfo';
import LogWindow from './LogWindow';
import './StatusViewer.scss';

interface StatusViewerProps {
  selectedBranches: Array<string>,
};

const StatusViewer = (props: StatusViewerProps) => {
  return (
    <div className="StatusViewer">
      <BranchInfo selectedBranches={props.selectedBranches} />
      <LogWindow />
    </div>
  );
};

export default StatusViewer;
