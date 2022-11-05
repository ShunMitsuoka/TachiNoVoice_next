import _BaseGuestLayout from '../../../layouts/_baseGuestLayout';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { BaseInput } from '../../../components/atoms/input/baseInput';
import { FormLabel } from '../../../components/atoms/label/formLabel';
import axios from '../../../libs/axios/axios';
import { ApiService } from '@/app/services/apiService';
import { ValidationErrors } from '@/components/modules/common/validation/validationErrors';
import Link from 'next/link';
import { RouteManager } from '@/app/manages/routeManager';
import { FormSelect } from '@/components/atoms/select/formSelect';
import { YearSelect } from '@/components/modules/common/dateSelect/yearSelect';
import { MonthSelect } from '@/components/modules/common/dateSelect/monthSelect';
import { DateSelect } from '@/components/modules/common/dateSelect/dateSelect';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import { LargeButton } from '@/components/atoms/buttons/largeButton';
import { useValidationError } from '@/hooks/common/useValidationError';
import { useRouter } from 'next/router';

type formDate = {
    user_name: string,
    nickname: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    gender: string,
    birthyear: string,
    birthmonth: string,
    birthday: string;
};

export default function PreRegisterComp() {

    const validationError = useValidationError();
    const pageLoading = usePageLoading();
    const router = useRouter()

    const [formData, setFormData] = useState<formDate>({
        user_name: "",
        nickname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        gender: "",
        birthyear: "",
        birthmonth: "",
        birthday: "",
    });

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