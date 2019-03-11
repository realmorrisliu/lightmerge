import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/RootStore';
import styles from './LogWindow.module.scss';

@observer
class LogWindow extends React.Component {
  render() {
    const { log } = store;

    return (
      <div className={styles.LogWindow}>
        {log.logs.join('')}
      </div>
    );
  }
}

export default LogWindow;
