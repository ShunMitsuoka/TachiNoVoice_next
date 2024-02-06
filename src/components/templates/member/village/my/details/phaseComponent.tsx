import { appConst } from '@/app/const/appConst';
import { RouteManager } from '@/app/manages/routeManager';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Village } from 'villageType';

interface Props {
  title: string;
  isActive: boolean;
  children: React.ReactNode;
  village: Village;
}

export const PhaseComponent: React.FC<Props> = ({
  title,
  isActive,
  children,
  village
}) => {

  const isSettingShow: boolean = useMemo(() => {
    return isActive && village.is_necessary_to_set_phase_setting && village.exists_phase_setting && village.role_id == appConst.member.role.host
  }, [village]);

  return (
    <div className=''>
      <div className={'px-6 py-4 bg-white rounded-lg ' + (isActive && 'drop-shadow-lg')}>
        <div className={'text-lg font-bold ' + (!isActive && 'text-gray-500')}>
          {
            isActive &&
            <span className='inline-block mr-2'>
              ▶︎
            </span>
          }
          {title}
        </div>
        {
          isActive &&
          <div className='text-center mt-4 mb-2'>
            {children}
          </div>
        }
      </div>
      <div className='text-right mt-2'>
        {
          isSettingShow &&
          <Link 
            href={RouteManager.webRoute.member.village.my.details.phaseSetting + village.village_id }
          >
            <span className='underline'>フェーズ設定</span>
          </Link>
        }
      </div>
    </div>
  )
}