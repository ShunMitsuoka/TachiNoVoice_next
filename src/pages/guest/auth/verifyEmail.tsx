import _BaseGuestLayout from '../../../layouts/_baseGuestLayout';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { RouteManager } from '../../../app/manages/routeManager';
import { LargeButton } from '../../../components/atoms/buttons/largeButton';
import { useSession } from 'next-auth/react';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import axios from '@/libs/axios/axios';
import { ApiService } from '@/app/services/apiService';
import { useRouter } from 'next/router';

export default function VerifyEmail() {

    const { data: session, status } = useSession();
    const pageLoading = usePageLoading();
    const router = useRouter();
  
    useEffect(() => {
      pageLoading.show();
      if(status === "authenticated"){
        pageLoading.close();
      }
      if(status === "unauthenticated"){
        router.replace(RouteManager.webRoute.guest.auth.login);
      }
    },[status]);

    const onClickResend = () => {
        axios.post(ApiService.getFullURL(
            RouteManager.getUrlWithParam(RouteManager.apiRoute.guest.auth.resendVerifiedEmail)
        ), {}, ApiService.getAuthHeader(session))
        .then(function (response) {
            const res = ApiService.makeApiResponse(response);
            if(res.getSuccess()){
                alert('メールを送信しました');
            }else{
                alert('メールの送信に失敗しました');
            }
        })
        .finally(() => {
          pageLoading.close();
        });
    }

    return (
        <_BaseGuestLayout title="メール認証画面">
            <Head>
                <title>メール認証画面 | Tachi-No-Voice</title>
            </Head>
            <div className="text-center py-20">
                <h1 className="text-2xl">本登録が完了していません</h1>
            </div>
            <div className="bg-p-sub px-8 py-10 text-lg">
                <div className=' text-center'>
                    <p>本登録が完了していません。</p>
                    <p>ご登録いただいたメールアドレスに認証メールを送信しておりますので、そちらから本登録を完了してください。</p>
                    <p>認証メールが届いていない方は以下のボタンから認証メールを再度送信いたします。</p>
                </div>
                <div className="text-center mt-6">
                    <LargeButton onClick={onClickResend}>
                        認証メール再送
                    </LargeButton>
                </div>
            </div>
            <div className="text-center mt-6">
                <LinkButton href={RouteManager.webRoute.guest.top}>
                    TOPへ
                </LinkButton>
            </div>
        </_BaseGuestLayout>
    )
}
