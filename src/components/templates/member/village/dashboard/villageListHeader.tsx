import { RouteManager } from '@/app/manages/routeManager';
import Link from 'next/link';
import React from 'react';

interface Props {
  showFinishedVillage?: boolean;
  onClick: (flg : boolean) => void;
}

export const VillageListHeader: React.FC<Props> = ({
    showFinishedVillage = false,
    onClick,
}) => {
  return (
    <div className='bg-white grid grid-cols-12 text-center drop-shadow-lg'>
        <div className='relative col-span-6' onClick={() => onClick(false)}>
            <span className='inline-block pt-2 pb-1'>
                参加中ビレッジ
            </span>
            { !showFinishedVillage && 
                <div className='absoulte bottom-0 border-b-4 border-sub w-2/3 mx-auto'></div>
            }
        </div>
        <div className='relative col-span-6' onClick={() => onClick(true)}>
            <span className='inline-block pt-2 pb-1'>
                終了ビレッジ
            </span>
            { showFinishedVillage && 
                <div className='absoulte bottom-0 border-b-4 border-sub w-2/3 mx-auto'></div>
            }
        </div>
    </div>
  )
}