import { RouteManager } from '@/app/manages/routeManager';
import Link from 'next/link';
import React from 'react';

interface Props {
    id?: string;
    title?: string,
    content?: string,
}

export const SearchResultCard: React.FC<Props> = ({
    id,
    title = '',
    content = '',
}) => {
    return (
        <div className='col-span-12 md:col-span-6'>
            <Link href={RouteManager.webRoute.member.village.search.details + id}>
                <div className='text-sub text-center rounded-lg drop-shadow bg-white overflow-hidden shadow-lg'>
                    <div className='text-2xl text-center font-bold bg-sub text-white py-3'>{title}</div>
                    <div className='px-4 py-4 overflow-auto'>
                        {content}
                        aaaaaaajapihpjpajpdeahpaaaaaaajapihpjpa <br />
                        jpdeahpaaaaaaajapihpjpajpdeahpaaaaaaaja<br />
                        pihpjpajpdeahpaaaaaaajapihpjpajpdeahpaaaaa<br />
                        aajapihpjpajpdeahpaaaaaaajapihpjpajpdeahp<br />
                    </div>
                </div>
            </Link>
        </div>
    );
}