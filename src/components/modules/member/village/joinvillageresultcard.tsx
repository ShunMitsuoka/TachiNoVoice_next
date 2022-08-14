import Link from 'next/link';
import React from 'react';

interface Props {
    children?: React.ReactNode,
    name?: string;
    id?: string;
    value1?: string,
    value2?: string,
    value3?: string,
    _class?: string,
}

export const JoinVillageResultCard: React.FC<Props> = ({
    children,
    name,
    id,
    value1 = '',
    value2 = '',
    value3 = '',
    _class = '',
}) => {
    return (
        <div className='col-span-6 m-2 text-sub mt-5 px-6 rounded-lg drop-shadow bg-white'>
            <a>
                <div className='font-bold mt-3'>{value1}</div>
            </a>
            <a>
                <label className='mr-2'>{value2}歳</label>
                <label className=''>{value3}</label>
            </a>
        </div >
    );
}