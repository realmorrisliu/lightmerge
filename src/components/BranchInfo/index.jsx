import React from 'react';
import { observer } from 'mobx-react';
import BranchBlock from './BranchBlock';
import styles from './BranchInfo.module.scss';
import store from '../../stores/RootStore';

@observer
class BranchInfo extends React.Component {
  render() {
    const { repo } = store;

    return (
      <div className={styles.BranchInfo}>
        <div className={styles.Base}>
          <span className={styles.Type}>Base branch:</span>
          <select className={styles.BaseBranch} onChange={store.repo.updateBase}>
            {
              repo.branches.map(branch => <option key={branch} value={branch}>{branch}</option>)
            }
          </select>
        </div>
        <div className={styles.Source}>
          <span className={styles.Type}>Source branch:</span>
          <span className={styles.Blocks}>
            {
              repo.selectedBranches.map(branch => <BranchBlock key={branch} name={branch} />)
            }
          </span>
        </div>
        <div className={styles.Target}>
          <span className={styles.Type}>Target branch:</span>
          <span className={styles.Blocks}>
            <BranchBlock name="lightmerge" />
          </span>
        </div>
      </div>
    );
  }
}

export default BranchInfo;
