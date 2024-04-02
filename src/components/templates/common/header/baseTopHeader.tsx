import { RouteManager } from '@/app/manages/routeManager';
import Link from 'next/link';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

type Props = {
    title? : string;
    children?: React.ReactNode;
};

export const BaseTopHeader: React.FC<Props> = ({
    title = 'TACHI-NO-VOICE',
    children,
}) => {
    return (
        <header className='fixed top-0 left-0 w-full h-16 z-10 bg-sub shadow-xl flex justify-between px-3'>
			<div className='flex items-center'>
				<h1 className='w-full content-center text-slate-50 text-2xl'>
					{title}
				</h1>
			</div>
			<div className='hidden sm:block fixed top-5 justify-end right-48 rounded-md bg-main font-sub text-center w-28'>
				<Link href={RouteManager.webRoute.guest.auth.register}>
					<a>新規会員登録</a>
				</Link>
			</div>
			<div className='hidden sm:block fixed top-5 rounded-md right-24 bg-main font-sub text-center w-20'>
				<Link href={RouteManager.webRoute.guest.auth.login}>
					<a>ログイン</a>
				</Link>
			</div>
			<div className='fixed top-0'>
				<Menu right className='text-slate-50' outerContainerId='outer-container'>
					{children}
				</Menu>
			</div>
        </header>
    )
}