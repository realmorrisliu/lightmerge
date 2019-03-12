import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/RootStore';
import styles from './LogWindow.module.scss';
import { Socket } from '../../utils/network';

Socket.on('deploy', (value) => {
  const { log } = store;
  log.logs.push(value);
});

@observer
class LogWindow extends React.Component {
  render() {
    const { log } = store;

    return (
      <div className={styles.LogWindow}>
        {log.logs.join('<br />')}
      </div>
    );
  }
}

export default LogWindow;
