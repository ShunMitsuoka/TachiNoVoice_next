import _BaseAdminLayout from '../../layouts/_baseAdminLayout';
import Head from 'next/head';
import { AuthService } from '../../app/services/authService';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import _BaseLayout from '../../layouts/_baseLayout';
import { AdminHeader } from '../../components/templates/admin/adminHeader';


export default function Test() {
    return (
        <_BaseLayout>
            <h1>aaafafafaf</h1>
        </_BaseLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}