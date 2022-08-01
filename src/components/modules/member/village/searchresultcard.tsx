import Link from 'next/link';
import React from 'react';

interface Props {
    children?: React.ReactNode,
    name?: string;
    id?: string;
    value1?: string,
    value2?: string,
    _class?: string,
}

export const SearchResultCard: React.FC<Props> = ({
    children,
    name,
    id,
    value1 = '',
    value2 = '',
    _class = '',
}) => {
    return (
        <div className=' col-span-12 md:col-span-6 text-sub mt-5 px-6 text-center rounded-lg drop-shadow bg-white'>
            <Link href={'/member/village/search/details/' + id}>
                <a>
                    <div className='text-3xl text-center font-bold mt-2'>{value1}</div>
                    <div className='mt-4 scroll-m-9 h-24'>{value2}</div>
                </a>
            </Link>
        </div >
    );
}