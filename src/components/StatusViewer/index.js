import React from 'react';
import BranchInfo from './BranchInfo';
import Logs from './Logs';
import './StatusViewer.scss';

interface StatusViewerProps {
  selectedBranches: Array<string>,
};

const StatusViewer = (props: StatusViewerProps) => {
  return (
    <div className="StatusViewer">
      <BranchInfo selectedBranches={props.selectedBranches} />
      <Logs />
    </div>
  );
};

export default StatusViewer;
