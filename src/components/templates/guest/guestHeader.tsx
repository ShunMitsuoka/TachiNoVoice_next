import React from 'react';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import { RouteManager } from '@/app/manages/routeManager';


export const GuestHeader = () => {
    return (
        <header className='relative top-0 left-0 w-full h-16 z-10 bg-sub'>
            <Menu right className=' text-slate-50'>
                <ul>
                    <li>
                        <Link href={RouteManager.webRoute.guest.top}>
                            <a>TOP</a>
                        </Link>
                    </li>
                    <li className='mt-4'>
                        <Link href={RouteManager.webRoute.guest.auth.login}>
                            <a>LOGIN</a>
                        </Link>
                    </li>
                </ul>
            </Menu>
        </header>
    )
}