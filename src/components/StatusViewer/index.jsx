import React from 'react';
import PropTypes from 'prop-types';
import BranchInfo from '../BranchInfo';
import LogWindow from '../LogWindow';
import styles from './StatusViewer.module.scss';

const StatusViewer = ({ branchList, selectedBranches, logs }) => (
  <div className={styles.StatusViewer}>
    <BranchInfo branchList={branchList} selectedBranchList={selectedBranches} />
    <LogWindow logs={logs} />
  </div>
);

StatusViewer.propTypes = {
  branchList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBranches: PropTypes.arrayOf(PropTypes.string).isRequired,
  logs: PropTypes.string.isRequired,
};

export default StatusViewer;
