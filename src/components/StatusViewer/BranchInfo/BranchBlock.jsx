import React from 'react';
import PropTypes from 'prop-types';
import './BranchBlock.scss';

const BranchBlock = ({ name }) => (
  <span className="BranchBlock">
    {name}
  </span>
);

BranchBlock.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BranchBlock;
