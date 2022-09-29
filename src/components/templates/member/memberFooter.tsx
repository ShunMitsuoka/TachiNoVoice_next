import Link from 'next/link';
import React, { useMemo } from 'react';
import { RouteManager } from '@/app/manages/routeManager';
import { AiTwotoneHome } from "react-icons/ai";
import { GiBarracksTent } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";

type footerInfo = {
    href : string,
    icon : React.ReactNode,
    label : string
}


export const MemberFooter = () => {

    const content = useMemo(() => {
        const footer:footerInfo[] = [
            {
                href : RouteManager.webRoute.member.dashboard,
                icon : <AiTwotoneHome/>,
                label : 'トップ',
            },
            {
                href : RouteManager.webRoute.member.village.my.index,
                icon : <GiBarracksTent />,
                label : 'ビレッジ',
            },
            {
                href :  RouteManager.webRoute.member.village.search.index,
                icon : <FaSearch />,
                label : '検索',
            },
            {
                href : RouteManager.webRoute.member.news.index,
                icon : <MdMail />,
                label : 'お知らせ',
            },
            {
                href : RouteManager.webRoute.member.setting.index,
                icon : <AiFillSetting />,
                label : '設定',
            },
        ];
        let items: React.ReactNode[] = [];
        footer.map((info, index) => {
            items.push(
                <div key={index} className='col-span-1'>
                    <Link href={info.href}>
                        <a className='flex flex-col justify-center items-center'>
                            <span className='inline-block text-3xl mb-1'>
                                {info.icon}
                            </span>
                            <span className='text-xs'>{info.label}</span>
                        </a>
                    </Link>
                </div> 
            );
        });
        return items;
      }, [])

    return (
        <footer className='bg-sub pt-2 pb-1 px-3'>
            <div className='grid grid-cols-5 gap-2 h-full text-main'>
                {
                    content
                }
            </div>
        </footer>
    )
}