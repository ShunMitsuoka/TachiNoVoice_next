import _BaseGuestLayout from '../../../layouts/_baseGuestLayout';
import Head from 'next/head';
import React from 'react';
import { RouteManager } from '@/app/manages/routeManager';
import { LargeButton } from '@/components/atoms/buttons/largeButton';
import { useRouter } from 'next/router';

export default function PreRegisterComp() {

    const router = useRouter()

    const onClickSave = () => {
        router.replace(RouteManager.webRoute.guest.auth.login);
    }
    return (
        <_BaseGuestLayout title="仮会員登録完了">
            <Head>
                <title>仮会員登録完了 | Tachi-No-Voice</title>
            </Head>
            <div className="text-center py-20">
                <h1 className="text-3xl">仮会員登録完了</h1>
            </div>
            <div className="bg-p-sub px-8 py-10 text-lg">
                <div>
                    <p>この度は、ご登録いただき誠にありがとうございます。</p>
                    <p>
                        ご本人様確認のため、ご登録いただいたメールアドレスに、<br/>
                        本登録のご案内のメールが届きます。
                    </p>
                    <p>
                        そちらに記載されているURLにアクセスし、<br/>
                        アカウントの本登録を完了させてください。
                    </p>
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