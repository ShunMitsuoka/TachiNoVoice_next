import React from 'react';
import { slide as Menu } from 'react-burger-menu';

type Props = {
    title? : string;
    children?: React.ReactNode;
};

export const BaseHeader: React.FC<Props> = ({
    title = 'TACHI-NO-VOICE',
    children,
}) => {
    return (
        <header className='sticky top-0 left-0 w-full h-16 z-10 bg-sub shadow-xl'>
            <div className='h-full w-full flex justify-center items-end pb-2 text-slate-50 text-2xl'>
                {title}
            </div>
            <div className='fixed top-0'>
                <Menu right className='text-slate-50' outerContainerId='outer-container'>
                    {children}
                </Menu>
            </div>
        </header>
    )
}