import { appConst } from '@/app/const/appConst';
import { RouteManager } from '@/app/manages/routeManager';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Village } from 'villageType';

interface Props {
  village: Village;
}

export const PhaseDetailsHeader: React.FC<Props> = ({
  village
}) => {
    const router = useRouter();
  return (
    <div className='bg-white grid grid-cols-12 text-center drop-shadow-lg'>
        <div className='relative col-span-4'>
            <Link href={RouteManager.webRoute.member.village.my.details.index + village.village_id}>
                <span className='inline-block pt-2 pb-1'>
                    フェーズ
                </span>
            </Link>
            { router.asPath.match(new RegExp(RouteManager.webRoute.member.village.my.details.index + village.village_id)) && 
                <div className='absoulte bottom-0 border-b-4 border-sub w-2/3 mx-auto'></div>
            }
        </div>
        <div className='relative col-span-4'>
            <Link href={RouteManager.webRoute.member.village.my.details.members + village.village_id}>
                <span className='inline-block pt-2 pb-1'>
                    メンバー
                </span>
            </Link>
            { router.asPath.match(new RegExp(RouteManager.webRoute.member.village.my.details.members + village.village_id)) && 
                <div className='absoulte bottom-0 border-b-4 border-sub w-2/3 mx-auto'></div>
            }
        </div>
        <div className='relative col-span-4'>
            <Link href={RouteManager.webRoute.member.village.my.details.members + village.village_id}>
                <span className='inline-block pt-2 pb-1'>
                    意見
                </span>
            </Link>
            {/* { router.asPath.match(new RegExp(RouteManager.webRoute.member.village.my.details.members + village.village_id)) && 
                <div className='absoulte bottom-0 border-b-4 border-sub w-2/3 mx-auto'></div>
            } */}
        </div>
    </div>
  )
}