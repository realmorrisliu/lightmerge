import React from 'react';
import { observer } from 'mobx-react';
import BranchInfo from '../BranchInfo';
import LogWindow from '../LogWindow';
import store from '../../stores/RootStore';
import styles from './StatusViewer.module.scss';

@observer
class StatusViewer extends React.Component {
  render() {
    const { repo } = store;

    return (
      <div className={styles.StatusViewer}>
        <BranchInfo branchList={repo.branches} selectedBranchList={repo.selectedBranches} />
        <LogWindow />
      </div>
    );
  }
}

export default StatusViewer;
