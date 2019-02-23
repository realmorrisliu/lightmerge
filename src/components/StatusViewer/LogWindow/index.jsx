import React from 'react';
import PropTypes from 'prop-types';
import styles from './LogWindow.module.scss';

const LogWindow = ({ logs }) => (
  <div className={styles.LogWindow}>
    {logs}
  </div>
);

LogWindow.propTypes = {
  logs: PropTypes.string.isRequired,
};

export default LogWindow;
