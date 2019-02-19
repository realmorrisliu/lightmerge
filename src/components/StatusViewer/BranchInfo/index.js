import React from 'react';
import BranchBlock from './BranchBlock';
import './BranchInfo.scss';

interface BranchInfoProps {
  selectedBranches: Array<string>,
};

const BranchInfo = (props: BranchInfoProps) => {
  return (
    <div className="BranchInfo">
      <div className="Base">
        <span className="Type">Base branch:</span>
        <span className="Blocks">
          <BranchBlock name="master" />
        </span>
      </div>
      <div className="Source">
        <span className="Type">Source branch:</span>
        <span className="Blocks">
          { props.selectedBranches.map(branch => <BranchBlock key={branch} name={branch} />) }
        </span>
      </div>
      <div className="Target">
        <span className="Type">Target branch:</span>
        <span className="Blocks">
          <BranchBlock name="lightmerge" />
        </span>
      </div>
    </div>
  );
};

export default BranchInfo;
