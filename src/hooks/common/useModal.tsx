import React, { useState } from 'react';

export const useModal = () => {

  const [isShow, setShow] = useState<boolean>(false);

  const show = () => {
    setShow(true);
  }

  const close = () => {
    setShow(false);
  }

  const content = (children : React.ReactNode) => {
    return (
        isShow ?
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full px-4 bg-slate-800 bg-opacity-60 z-10'>
            <div className='absolute top-0 left-0 w-full h-full' onClick={close}></div>
            <div className='relative w-full'>
                <div className='w-full bg-white rounded-lg shadow-md overflow-hidden'>
                  {children}
                </div>
            </div>
        </div>
        :
        null
    );
  }

  return {isShow, show, close, content};
}
