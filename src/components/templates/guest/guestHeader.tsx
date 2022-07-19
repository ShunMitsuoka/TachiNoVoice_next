import React from 'react';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import { RouteManager } from '@/app/manages/routeManager';
import { BaseHeader } from '../common/header/baseHeader';

type Props = {
    title? : string;
};

export const GuestHeader: React.FC<Props> = ({
    title,
}) => {
    return (
        <BaseHeader title={title}>
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
        </BaseHeader>
    )
}