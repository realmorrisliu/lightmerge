import React from 'react';
import PropTypes from 'prop-types';
import BranchBlock from './BranchBlock';
import './BranchInfo.scss';

const BranchInfo = ({ selectedBranches }) => (
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
        {selectedBranches.map(branch => <BranchBlock key={branch} name={branch} />)}
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

BranchInfo.propTypes = {
  selectedBranches: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BranchInfo;
