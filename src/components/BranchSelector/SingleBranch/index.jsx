import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SingleBranch.scss';

const reservedBranches = ['lightmerge'];

const SingleBranch = (
  {
    checked,
    onClick,
    extraClasses,
    isGroup,
    text,
  },
) => {
  const [status, setStatus] = useState(checked);

  const handleClick = () => {
    setStatus(!status);
    onClick();
  };

  const generateClassName = className => `${className} ${extraClasses}`;

  const disabled = branch => reservedBranches.includes(branch);

  const branchCheckbox = (
    !disabled(text)
      ? <input className="Checkbox" type="checkbox" checked={status} onChange={handleClick} />
      : null
  );

  return (
    <div className={generateClassName('SingleBranch', extraClasses)}>
      {
        isGroup
          ? <button type="button" className="Expand" onClick={handleClick}>{!status ? '+' : '-'}</button>
          : branchCheckbox
      }
      <code className="Text">{text}</code>
    </div>
  );
};

SingleBranch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isGroup: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  extraClasses: PropTypes.string,
};

SingleBranch.defaultProps = {
  extraClasses: '',
};

export default SingleBranch;
