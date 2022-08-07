import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { myVillageType } from '@/pages/member/village/my/details/[id]';
import React from 'react';

interface Props {
    title : string;
    isActive : boolean;
    children : React.ReactNode;
}

export const PhaseComponent: React.FC<Props> = ({
    title,
    isActive,
    children
}) => {

    return (
        <div className={'px-6 py-4 bg-white rounded-lg ' + (isActive && 'drop-shadow-lg')}>
          <div className={'text-lg ' + (!isActive && 'text-gray-500')}>
            {title}
          </div>
          <div className='text-center mt-2'>
              {children}
          </div>
        </div>
    )
}