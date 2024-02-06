import { ColorService } from '@/app/services/colorService';
import React from 'react';
import { Village } from 'villageType';

interface Props {
    village: Village;
    showContent?:boolean;
    _class?: string;
}

export const VillageTitle: React.FC<Props> = ({
    village,
    showContent = false,
    _class
}) => {
    return (
        <div className={' bg-white bg-opacity-60 mt-6 ' + _class}>
            <div className='flex justify-between px-2 py-1 bg-sub text-white'>
                <div className={ColorService.bgRoleColre(village.role_id) + ' px-1 rounded-md text-sub'}>
                    {village.role_name}  
                </div>
                <div>
                    {
                        village.is_finished ?
                        '終了'
                        :
                        village.phase_name
                    }
                    
                </div>
            </div>
            <div className='px-2 py-4'>
                <div className={''}>
                    <div className='font-bold'>
                        【議題】
                    </div>
                    <div className='font-bold text-xl pl-3'>
                        {village.title}
                    </div>
                </div >
                {
                    showContent && 
                    <div className={'mt-2'}>
                        <div className='font-bold'>
                            【内容】
                        </div>
                        <div className='font-bold text-lg pl-3'>
                            {village.content}
                        </div>
                    </div >
                }
            </div>
        </div>

    );
}