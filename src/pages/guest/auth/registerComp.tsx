import _BaseGuestLayout from '../../../layouts/_baseGuestLayout';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { BaseInput } from '../../../components/atoms/input/baseInput';
import { FormLabel } from '../../../components/atoms/label/formLabel';
import axios from '../../../libs/axios/axios';
import { ApiService } from '../../../app/services/apiService';
import Link from 'next/link';
import { RouteManager } from '../../../app/manages/routeManager';
import { LargeButton } from '../../../components/atoms/buttons/largeButton';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

export default function registerComp() {
    const router = useRouter();
    // const params = {
    //     token: router.query,
    // };
    // console.log(router.query)
    // console.log(ApiService.getFullURL(RouteManager.getUrlWithParam(RouteManager.apiRoute.guest.auth.mainRegister)));
    // axios.post(ApiService.getFullURL(
    //     RouteManager.getUrlWithParam(RouteManager.apiRoute.guest.auth.mainRegister)
    //     )
    //     , params)
    // .then(function (response) {
    //     alert("本会員登録できたよー－－－－－ん")
    // })
    // .catch((error) =>{
    //     const res = ApiService.makeApiErrorResponse(error);
    //     console.log(res)
    //     // alert("エラーだよー－－－－－－－ｎ")
    // })
    // .finally(() => {
    //     // alert("エラーだよー－－－－－－－ｎ")
    // });

    const onClickSave = () => {
        router.replace(RouteManager.webRoute.guest.auth.login);
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

