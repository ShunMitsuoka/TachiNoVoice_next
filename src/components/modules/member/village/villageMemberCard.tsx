import { ColorService } from '@/app/services/colorService';
import React from 'react';

interface Props {
    id?: string;
    name?: string;
    age?: string,
    gender?: string,
    role_id: number,
}

export const VillageMemberCard: React.FC<Props> = ({
    id,
    name,
    age,
    gender,
    role_id,
}) => {
    return (
        <div className='col-span-6 text-sub rounded-lg shadow-lg bg-white overflow-hidden'>
        <div className={ColorService.bgRoleColre(role_id) + ' px-2 py-1 text-sm'}>
                <div className='font-bold'>{name}</div>
            </div>
            <div className='px-2 py-1'>
                <label className='mr-2'>{age}歳</label>
                <label className=''>{gender}</label>
            </div>
        </div >
    );
}