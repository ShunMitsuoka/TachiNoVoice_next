import React from 'react';
import Link from 'next/link';

export const GuestHeader = () => {
    return (
        <header className={'relative top-0 left-0 w-full z-10'}>
            <div className=''>
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
            </div>
        </header>
    )
}