import React from "react";
import { BaseTopHeader } from '../common/header/baseTopHeader';
import Link from "next/link";
import { RouteManager } from "@/app/manages/routeManager";

type Props = {
    title?: string;
};

export const GuestTopHeader: React.FC<Props> = ({
    title,
}) => {
    return (
        <BaseTopHeader title={title}>
            <ul>
                <li>
                    <Link href={RouteManager.webRoute.guest.top}>
                        <a>TOP</a>
                    </Link>
                </li>
                <li>
                    <Link href={RouteManager.webRoute.guest.auth.login}>
                        <a>LOGIN</a>
                    </Link>
                </li>
            </ul>
        </BaseTopHeader>
    )
}

