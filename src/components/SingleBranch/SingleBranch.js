import React, { useState } from 'react';
import './SingleBranch.scss';

interface SingleBranchProps {
  text: string,
  checked: boolean,
  isGroup: boolean,
  onClick: Function,
  extraClasses: Array<string>,
};

const SingleBranch = (props: SingleBranchProps) => {
  const [status, setStatus] = useState(props.checked);

  const handleClick = () => {
    setStatus(!status);
    props.onClick();
  }

  const generateClassName = (className, extraClasses = []) => {
    return [className, ...extraClasses].join(' ');
  }

  return (
    <div className={generateClassName('SingleBranch', props.extraClasses)}>
      {
        props.isGroup
        ? <span className="Arrow" onClick={handleClick}>{ !status ? '+' : '-' }</span>
        : <input className="Checkbox" type="checkbox" checked={status} onChange={handleClick} />
      }
      <span className="Text">{ props.text }</span>
    </div>
  );
};

export default SingleBranch;
