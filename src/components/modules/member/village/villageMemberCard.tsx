import Link from 'next/link';
import React from 'react';

interface Props {
    id?: string;
    name?: string;
    age?: string,
    gender?: string,
    role_id?: number,
}

export const VillageMemberCard: React.FC<Props> = ({
    id,
    name,
    age,
    gender,
    role_id,
}) => {
    return (
        <div className='col-span-6 text-sub px-6 rounded-lg drop-shadow bg-white'>
            <a>
                <div className='font-bold mt-3'>{name}</div>
            </a>
            <a>
                <label className='mr-2'>{age}歳</label>
                <label className=''>{gender}</label>
            </a>
        </div >
    );
}