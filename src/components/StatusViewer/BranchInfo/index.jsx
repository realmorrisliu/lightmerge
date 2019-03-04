import React from 'react';
import PropTypes from 'prop-types';
import BranchBlock from './BranchBlock';
import Repo from '../../../utils/repo';
import styles from './BranchInfo.module.scss';

const setBaseBranch = (e) => {
  Repo.setBase(e.target.value);
};

const BranchInfo = ({ branchList, selectedBranchList }) => (
  <div className={styles.BranchInfo}>
    <div className={styles.Base}>
      <span className={styles.Type}>Base branch:</span>
      <select className={styles.BaseBranch} onChange={setBaseBranch}>
        {
          branchList.map(branch => <option key={branch} value={branch}>{branch}</option>)
        }
      </select>
    </div>
    <div className={styles.Source}>
      <span className={styles.Type}>Source branch:</span>
      <span className={styles.Blocks}>
        {selectedBranchList.map(branch => <BranchBlock key={branch} name={branch} />)}
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

BranchInfo.propTypes = {
  branchList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBranchList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BranchInfo;
