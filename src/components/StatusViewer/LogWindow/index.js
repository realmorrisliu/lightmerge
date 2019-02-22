import React from 'react';
import './LogWindow.scss';

interface LogsProp {
  logs: string,
};

const LogWindow = (props: LogsProp) => (
  <div className="LogWindow">
    { props.logs }
  </div>
);

export default LogWindow;
