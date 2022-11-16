import _BaseGuestLayout from '../../../layouts/_baseGuestLayout';
import Head from 'next/head';
import React from 'react';
import { RouteManager } from '../../../app/manages/routeManager';
import { LargeButton } from '../../../components/atoms/buttons/largeButton';
import Router from 'next/router';

export default function RegisterComp() {
    // const router = useRouter();
    const onClickSave = () => {
        Router.replace(RouteManager.webRoute.guest.auth.login);
    }
    return (
        <_BaseGuestLayout title="本会員登録完了">
            <Head>
                <title>本会員登録完了 | Tachi-No-Voice</title>
            </Head>
            <div className="text-center py-20">
                <h1 className="text-3xl">本会員登録完了</h1>
            </div>
            <div className="bg-p-sub px-8 py-10 text-lg">
                <div className=' text-center'>
                    <p>本会員登録が完了しました。</p>
                    <p>ご登録いただいたメールアドレス、パスワードをご使用になり、ログインを行ってください。</p>
                </div>
                <div className="text-center mt-6">
                    <LargeButton
                        onClick={onClickSave}
                    >
                        TOPへ
                    </LargeButton>
                </div>
            </div>
        </_BaseGuestLayout>
    )
}

