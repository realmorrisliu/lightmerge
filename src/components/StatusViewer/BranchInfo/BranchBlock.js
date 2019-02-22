import React from 'react';
import './BranchBlock.scss';

const BranchBlock = (props) => (
  <span className="BranchBlock">
    { props.name }
  </span>
);

export default BranchBlock;
