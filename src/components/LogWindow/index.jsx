import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/RootStore';
import styles from './LogWindow.module.scss';
import { Socket } from '../../utils/network';
import { WS_EVENT } from '../../constants';

Socket.on(WS_EVENT.CLEAR, () => {
  store.log.resetLogs();
});

Socket.on(WS_EVENT.DEPLOY, (value) => {
  value
    .split('\n')
    .filter(line => line.length !== 0)
    .forEach((line) => {
      store.log.addLog(line);
    });
});

Socket.on(WS_EVENT.DEPLOY_DONE, () => {
  store.repo.resetDeploy();
});

Socket.on(WS_EVENT.MESSAGE, (value) => {
  store.log.addLog(value);
});

@observer
class LogWindow extends React.Component {
  render() {
    if (this.logWindow) {
      this.logWindow.scrollTop(Number.MAX_VALUE);
    }

    return (
      <div
        ref={(c) => {
          this.logWindow = c;
        }}
        className={styles.LogWindow}
      >
        {store.log.logs.map(log => (
          <>
            {log}
            <br />
          </>
        ))}
      </div>
    );
  }
}

export default LogWindow;
