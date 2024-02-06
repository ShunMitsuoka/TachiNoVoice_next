import _BaseGuestLayout from '../../../layouts/_baseGuestLayout';
import Head from 'next/head';
import React, { useState } from 'react';
import { BaseInput } from '../../../components/atoms/input/baseInput';
import { FormLabel } from '../../../components/atoms/label/formLabel';
import axios from '../../../libs/axios/axios';
import { ApiService } from '@/app/services/apiService';
import { ValidationErrors } from '@/components/modules/common/validation/validationErrors';
import Link from 'next/link';
import { RouteManager } from '@/app/manages/routeManager';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import { LargeButton } from '@/components/atoms/buttons/largeButton';
import { useValidationError } from '@/hooks/common/useValidationError';
import { useRouter } from 'next/router';
import { useSweetAlert } from '@/hooks/common/useSweetalert';

type formDate = {
    email: string,
};

export default function ForgotPassword() {

    const sweet = useSweetAlert();
    const validationError = useValidationError();
    const pageLoading = usePageLoading();
    const router = useRouter()

    const [formData, setFormData] = useState<formDate>({
        email: "",
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const onClickSave = () => {
        pageLoading.show();
        validationError.clearError();
        const params = {
            email: formData.email,
        };
        axios.post(
            ApiService.getFullURL(
                RouteManager.getUrlWithParam(RouteManager.apiRoute.guest.password.forgot)
            )
            , params)
        .then(async function (response) {
            await sweet.success("メールを送信しました", "OKをタッチしてください");
        })
        .catch(async (error) =>{
            await sweet.error("メールの送信に失敗しました", "もう一度試してください");
        })
        .finally(() => {
            pageLoading.close();
        });
    }
    return (
        <_BaseGuestLayout title="パスワードリセット">
            <Head>
                <title>パスワードリセット | Tachi-No-Voice</title>
            </Head>
            <div className="text-center py-20">
                <h1 className="text-3xl">パスワードリセット</h1>
            </div>
            <div className="bg-p-sub px-8 py-10 text-lg">
                <p>
                    登録されたメールアドレス宛にパスワードリセット用のメールを送信します。
                </p>
                {/* メールアドレス */}
                <div className="mt-4">
                    <FormLabel htmlFor='email'>メールアドレス ※必須</FormLabel>
                    <BaseInput
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'email'}/>
                </div>
                <div className="text-center mt-6">
                    <LargeButton
                        onClick={onClickSave}
                    >
                        送信
                    </LargeButton>
                </div>
            </div>
            <div className="mt-6 text-center text-lg">
                <Link href={RouteManager.webRoute.guest.auth.login} className='py-1'>
                    <a className="underline">ログインはこちら</a>
                </Link>
            </div>
        </_BaseGuestLayout>
    )
} 