import { RouteManager } from '@/app/manages/routeManager';
import { ColorService } from '@/app/services/colorService';
import Image from 'next/image';
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
        <div className='col-span-12 md:col-span-6 mt-6'>

            <div className='relative px-3 py-3 bg-white rounded-lg shadow-lg mb-2'>
                <div className="grid grid-cols-12 gap-3">
                    <div className=" col-span-4">
                        <Image src={'/images/member/village/village.png'} width={30} height={17} layout={'responsive'}/>
                    </div>
                    <div className=" col-span-8">
                        <div className=" font-bold mt-1">
                            {title}
                        </div>
                    </div>
                </div>
                <div className=' text-sm mt-2'>
                    {
                        content ? content : <>説明はありません</>
                        
                    }
                </div>
                <div className='relative text-right'>
                    <Link href={RouteManager.webRoute.member.village.search.details + id}>
                        <span className=" inline-block bg-blue rounded-full px-2 py-1 text-white text-sm ">
                            参加する
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}