import React from 'react';
import PropTypes from 'prop-types';
import styles from './BranchBlock.module.scss';

const BranchBlock = ({ name }) => (
  <span className={styles.BranchBlock}>
    {name}
  </span>
);

BranchBlock.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BranchBlock;
