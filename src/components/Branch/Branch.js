import React from 'react';
import SingleBranch from '../SingleBranch/SingleBranch';
import GroupBranch from '../GroupBranch/GroupBranch';
import './Branch.scss';

interface BranchProps {
  branchList: Array<string>,
  alreadySelected: Array<string>,
  onChange: Function,
};

const Branch = (props: BranchProps) => {
  const { branchList } = props;
  const branches = {};
  branchList.forEach((branch) => {
    const [name, sub] = branch.split('/');
    
    if (!branches[name]) {
      branches[name] = {
        checked: props.alreadySelected.includes(name),
        subBranches: [],
      }; 
    } 
    if (sub) {
      branches[name].subBranches.push({
        name: sub,
        checked: props.alreadySelected.includes(branch),
      });
    }
  });

  const handleBranchSelection = (branchName) => {
    props.onChange(branchName);
  };

  return (
    <div className="Branch">
      <h2 className="Title">Select Branches</h2>
      <div className="List">
      {
        Object.entries(branches).map(([branch, {checked, subBranches}]) => {
          const folded = subBranches.every(branch => branch.checked === false);
          
          return (
            subBranches.length === 0
            ? <SingleBranch key={branch} text={branch} checked={checked} onClick={() => {handleBranchSelection(branch)}} />
            : <GroupBranch key={branch} text={branch} folded={folded} children={subBranches} onChildClicked={handleBranchSelection} />
          );
        })
      } 
      </div>
    </div>
  );
};

export default Branch;
