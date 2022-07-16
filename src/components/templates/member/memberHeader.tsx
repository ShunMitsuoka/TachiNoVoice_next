import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export const MemberHeader = () => {

    const { data: session, status } = useSession();

    return (
        <header className='relative top-0 left-0 w-full h-16 z-10 bg-sub'>
            <div className='absolute right-0 w-10 h-full flex flex-col justify-center items-center mr-2'>
                <div className='w-full h-1 bg-main rounded-full'></div>
                <div className='w-full h-1 bg-main rounded-full mt-2'></div>
                <div className='w-full h-1 bg-main rounded-full mt-2'></div>
            </div>
            {/* <div className=''>
                <div className='pt-6 flex item-center justifty-between'>
                    <div className='text-2xl font-bold'>
                        TACHI-NO-VOICE
                    </div>
                    <div className=''>
                        <div className='hidden md:flex text-base font-robot'>
                            <nav className='flex items-center'>
                                <ul className='flex space-x-8'>
                                    <li>
                                        <Link href="/">
                                            <a>TOP</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/guest/auth/login">
                                            <a>LOGIN</a>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div> */}
        </header>
    )
}