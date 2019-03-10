import React from 'react';
import PropTypes from 'prop-types';
import SingleBranch from '../SingleBranch';
import GroupBranch from '../GroupBranch';
import './BranchSelector.scss';

const BranchSelector = (
  {
    branchList,
    alreadySelected,
    onChange,
  },
) => {
  const branches = {};
  branchList.forEach((branch) => {
    const [name, sub] = branch.split('/');

    if (!branches[name]) {
      branches[name] = {
        checked: alreadySelected.includes(name),
        subBranches: [],
      };
    }
    if (sub) {
      branches[name].subBranches.push({
        name: sub,
        checked: alreadySelected.includes(branch),
      });
    }
  });

  const handleBranchSelection = (branchName) => {
    onChange(branchName);
  };

  return (
    <div className="Branch">
      <h2 className="Title">Select Branches</h2>
      <div className="List">
        {
          Object.entries(branches).map(([branch, { checked, subBranches }]) => {
            const folded = subBranches.every(subBranch => subBranch.checked === false);

            return (
              subBranches.length === 0
                ? (
                  <SingleBranch
                    key={branch}
                    text={branch}
                    checked={checked}
                    isGroup={false}
                    onClick={() => {
                      handleBranchSelection(branch);
                    }}
                  />
                )
                : (
                  <GroupBranch
                    key={branch}
                    text={branch}
                    folded={folded}
                    subBranches={subBranches}
                    onChildClicked={handleBranchSelection}
                  />
                )
            );
          })
        }
      </div>
    </div>
  );
};

BranchSelector.propTypes = {
  branchList: PropTypes.arrayOf(PropTypes.string).isRequired,
  alreadySelected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BranchSelector;
