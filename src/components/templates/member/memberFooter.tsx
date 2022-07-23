import Link from 'next/link';
import React from 'react';
import { AiTwotoneHome } from "react-icons/ai";
import { GiBarracksTent } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { RouteManager } from '@/app/manages/routeManager';


type footerInfo = {
    href : string,
    icon : React.ReactNode,
    label : string
}

const footer:footerInfo[] = [
    {
        href : RouteManager.webRoute.member.dashboard,
        icon : <AiTwotoneHome />,
        label : 'トップ',
    },
    {
        href : '',
        icon : <GiBarracksTent />,
        label : 'ビレッジ',
    },
    {
        href :  RouteManager.webRoute.member.village.search.index,
        icon : <FaSearch />,
        label : '検索',
    },
    {
        href : '',
        icon : <MdMail />,
        label : 'お知らせ',
    },
    {
        href : '',
        icon : <AiFillSetting />,
        label : '設定',
    },
];

export const MemberFooter = () => {
    return (
        <footer className='bg-sub pt-2 pb-1 px-3'>
            <div className='grid grid-cols-5 gap-2 h-full text-main'>
                {
                    footer.map((info, index) => {
                        return (
                            <div key={index} className='col-span-1'>
                                <Link href={info.href}>
                                    <a className='block flex flex-col justify-center items-center'>
                                        <span className='inline-block text-3xl mb-1'>
                                            {info.icon}
                                        </span>
                                        <span className='text-xs'>{info.label}</span>
                                    </a>
                                </Link>
                            </div> 
                        );
                    })
                }
            </div>
        </footer>
    )
}