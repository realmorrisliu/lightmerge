import React from 'react';
import './BranchBlock.scss';

interface BranchBlockProps {
  name: string,
};

const BranchBlock = (props: BranchBlockProps) => (
  <span className="BranchBlock">
    { props.name }
  </span>
);

export default BranchBlock;
