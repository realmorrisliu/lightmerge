import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleBranch from '../SingleBranch';
import './GroupBranch.scss';

const GroupBranch = (
  {
    text,
    folded,
    subBranches,
    onChildClicked,
  },
) => {
  const [status, setStatus] = useState(folded);

  const handleClick = () => {
    setStatus(!status);
  };

  const childrenList = subBranches.map(branch => (
    <SingleBranch
      key={branch.name}
      text={branch.name}
      checked={branch.checked}
      isGroup={false}
      onClick={() => {
        const branchName = `${text}/${branch.name}`;
        onChildClicked(branchName);
      }}
      extraClasses="Indent"
    />
  ));

  return (
    <div className="GroupBranch">
      <SingleBranch
        text={text}
        checked={!folded}
        isGroup
        onClick={handleClick}
      />
      {status ? null : childrenList}
    </div>
  );
};

GroupBranch.propTypes = {
  text: PropTypes.string.isRequired,
  folded: PropTypes.bool.isRequired,
  subBranches: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChildClicked: PropTypes.func.isRequired,
};

export default GroupBranch;
