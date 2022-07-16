import _BaseAdminLayout from '../../layouts/_baseMemberLayout';
import Head from 'next/head';
import { AuthService } from '../../app/services/authService';
import type { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import _BaseLayout from '../../layouts/_baseLayout';
import _BaseMemberLayout from '../../layouts/_baseMemberLayout';


export default function Test() {

    const { data: session, status } = useSession();

    return (
        <_BaseMemberLayout>
            <h1>aaafafafaf</h1>
            <div>{session?.user.email}</div>
        </_BaseMemberLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}