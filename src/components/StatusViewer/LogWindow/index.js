import React from 'react';
import './LogWindow.scss';

const LogWindow = (props) => (
  <div className="LogWindow">
    { props.logs }
  </div>
);

export default LogWindow;
