import React from 'react';
import PropTypes from 'prop-types';
import BranchBlock from './BranchBlock';
import styles from './BranchInfo.module.scss';

const BranchInfo = ({ selectedBranchList }) => (
  <div className={styles.BranchInfo}>
    <div className={styles.Base}>
      <span className={styles.Type}>Base branch:</span>
      <span className={styles.Blocks}>
        <BranchBlock name="master" />
      </span>
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
  selectedBranchList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BranchInfo;
