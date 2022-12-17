import { RouteManager } from '@/app/manages/routeManager';
import Link from 'next/link';
import React from 'react';
import { Village } from 'villageType';

type menuItem = 'phase' | 'member' | 'opinion'; 
interface Props {
  villageId: number;
  menuType?: menuItem;
}

export const PhaseDetailsHeader: React.FC<Props> = ({
    villageId,
    menuType
}) => {
  return (
    <div className='bg-white grid grid-cols-12 text-center drop-shadow-lg'>
        <div className='relative col-span-4'>
            <Link href={RouteManager.webRoute.member.village.my.details.index + villageId}>
                <span className='inline-block pt-2 pb-1'>
                    フェーズ
                </span>
            </Link>
            { menuType == 'phase' && 
                <div className='absoulte bottom-0 border-b-4 border-sub w-2/3 mx-auto'></div>
            }
        </div>
        <div className='relative col-span-4'>
            <Link href={RouteManager.webRoute.member.village.my.details.members + villageId}>
                <span className='inline-block pt-2 pb-1'>
                    メンバー
                </span>
            </Link>
            { menuType == 'member' && 
                <div className='absoulte bottom-0 border-b-4 border-sub w-2/3 mx-auto'></div>
            }
        </div>
        <div className='relative col-span-4'>
            <Link href={RouteManager.webRoute.member.village.my.details.opinions + villageId}>
                <span className='inline-block pt-2 pb-1'>
                    意見
                </span>
            </Link>
            { menuType == 'opinion' && 
                <div className='absoulte bottom-0 border-b-4 border-sub w-2/3 mx-auto'></div>
            }
        </div>
    </div>
  )
}