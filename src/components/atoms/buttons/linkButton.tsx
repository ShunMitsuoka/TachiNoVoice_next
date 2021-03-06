import Link from 'next/link';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props {
    children?: React.ReactNode;
    href: string;
    _class?: string;
}

export const LinkButton: React.FC<Props> = ({
    children,
    href,
    _class,
}) => {
    return (
        <Link href={href}>
            <span className={'font-semibold px-5 py-3 rounded-lg w-auto bg-sub text-main ' + _class}>
                {children}
            </span>
        </Link>
    )
}