import { AnimatePresence, motion } from 'framer-motion';
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
        <AnimatePresence>
          <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-slate-800 bg-opacity-60 z-10'>
              <div className='absolute top-0 left-0 w-full h-full' onClick={close}></div>
              <motion.div 
                className='relative w-full px-4'
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale:  1, opacity: 1 }}
              >
              {children}
              </motion.div>
          </div>
        </AnimatePresence>
        :
        null
    );
  }

  return {isShow, show, close, content};
}
