import React from 'react';
import BranchInfo from './BranchInfo';
import './StatusViewer.scss';

interface StatusViewerProps {
  selectedBranches: Array<string>,
};

const StatusViewer = (props: StatusViewerProps) => {
  return (
    <div className="StatusViewer">
      <BranchInfo selectedBranches={props.selectedBranches} />
    </div>
  );
};

export default StatusViewer;
