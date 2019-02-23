import React from 'react';
import PropTypes from 'prop-types';
import BranchInfo from './BranchInfo';
import LogWindow from './LogWindow';
import styles from './StatusViewer.module.scss';

const StatusViewer = ({ selectedBranches, logs }) => (
  <div className={styles.StatusViewer}>
    <BranchInfo selectedBranches={selectedBranches} />
    <LogWindow logs={logs} />
  </div>
);

StatusViewer.propTypes = {
  selectedBranches: PropTypes.arrayOf(PropTypes.string).isRequired,
  logs: PropTypes.string.isRequired,
};

export default StatusViewer;
