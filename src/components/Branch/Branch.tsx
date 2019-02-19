import React from 'react';
import './Branch.scss';

interface BranchProps {
  branchList: Array<string>,
};

const Branch = (props: BranchProps) => {
  const { branchList } = props;
  const branches = branchList.forEach((branch) => {
    const [name, sub] = branch.split('/');
    return {
      name,
      sub,
    };
  });

  return (
    <div className="Branch">
      <ul>a</ul>
    </div>
  );
};

export default Branch;
