import React from 'react';
import PropTypes from 'prop-types';
import './LogWindow.scss';

const LogWindow = ({ logs }) => (
  <div className="LogWindow">
    {logs}
  </div>
);

LogWindow.propTypes = {
  logs: PropTypes.string.isRequired,
};

export default LogWindow;
