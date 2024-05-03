import React from 'react';
import './style.scss';

function Toggle(props) {
  const { name, checked, labels, inline, handleChange } = props;
  return (
    <div className={'toggle ' + name}>
      {!inline && <span>{labels[0]}</span>}
      <input
        onChange={handleChange}
        type='checkbox'
        id={name}
        name={name}
        checked={checked}
      />
      <label htmlFor={name}>
        {labels.map((item, index) => {
          return (
            <div className='toggleLabel'>
              <span className='toggle-text'>{inline && item}</span>{' '}
            </div>
          );
        })}
        <div className='toggler' />
      </label>
      {!inline && <span>{labels[1]}</span>}
    </div>
  );
}

export default Toggle;
