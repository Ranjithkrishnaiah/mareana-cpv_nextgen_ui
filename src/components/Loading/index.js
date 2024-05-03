import React from 'react';
import Spinner from './Spinner';

const Loading = ({ text, show }) => {
  return (
    <>
      {show ? (
        <>
          <div className='ant-modal-mask'></div>
          <Spinner text={text} />
        </>
      ) : null}
    </>
  );
};

export default Loading;
