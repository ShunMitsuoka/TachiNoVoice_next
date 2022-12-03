import { ColorService } from '@/app/services/colorService';
import React from 'react';
import { Village } from 'villageType';

interface Props {
    village: Village;
    _class?: string;
}

export const VillageTitle: React.FC<Props> = ({
    village,
    _class
}) => {
    return (
        <div className=' bg-white bg-opacity-60 mt-6'>
            <div className='flex justify-between px-2 py-1 bg-sub text-white'>
                <div className={ColorService.bgRoleColre(village.role_id) + ' px-1 rounded-md text-sub'}>
                    {village.role_name}  
                </div>
                <div>
                    {village.phase_name}
                </div>
            </div>
            <div className='py-4'>
                <div className={'px-2 text-xl font-bold ' + _class}>
                    {village.title}
                </div >
            </div>
        </div>

    );
}