import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export const AdminHeader = () => {

    const { data: session, status } = useSession();

    return (
        <header className='px-4 sm:px-6 md:px-8 relative top-0 left-0 w-full z-10'>
            <div className=''>
                <div className='pt-6 flex item-center justify-between'>
                    <div className='text-2xl font-bold'>
                        <Link href="/">
                            <a>Repono</a>
                        </Link>
                    </div>
                    <div className=''>
                        <div className='hidden md:flex text-base font-robot'>
                            <nav className='flex items-center'>
                                <ul className='flex space-x-8'>
                                    <li>
                                        <Link href="/admin/article/list">
                                            <a>DASHBOARD</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/article/post">
                                            <a>POST</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={() => signOut()}>SING OUT</button>
                                    </li>
                                </ul>
                                <ul>
                                    {session?.user.name}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}