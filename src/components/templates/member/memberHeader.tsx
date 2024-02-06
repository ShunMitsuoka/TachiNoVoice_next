import React from 'react';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import { signOut, useSession } from 'next-auth/react';
import { RouteManager } from '@/app/manages/routeManager';
import { BaseHeader } from '../common/header/baseHeader';

type Props = {
    title? : string;
};

export const MemberHeader: React.FC<Props> = ({
    title,
}) => {
    return (
        <BaseHeader title={title}>
            <ul>
                <li>
                    <Link href={RouteManager.webRoute.member.dashboard}>
                        <a>DASHBOARD</a>
                    </Link>
                </li>
                <li className='mt-4'>
                    <a onClick={() => { signOut(); }} className='cursor-pointer'>
                        LOGOUT
                    </a>

                </li>
            </ul>
        </BaseHeader>
    )
}