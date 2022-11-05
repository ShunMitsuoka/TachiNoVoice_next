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

export default function Register() {

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

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const onClickSave = () => {
        pageLoading.show();
        validationError.clearError();
        const params = {
            user_name: formData.user_name,
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
            gender: formData.gender,
            birthyear: formData.birthyear,
            birthmonth: formData.birthmonth,
            birthday: formData.birthday,
        };
        axios.post(
            ApiService.getFullURL(
                RouteManager.getUrlWithParam(RouteManager.apiRoute.guest.auth.register)
            )
            , params)
        .then(function (response) {
            // alert('仮会員登録に成功しました。\nログインしてください。');
            router.replace(RouteManager.webRoute.guest.auth.preRegisterComp);
        })
        .catch((error) =>{
            const res = ApiService.makeApiErrorResponse(error);
            validationError.showError(res);
        })
        .finally(() => {
            pageLoading.close();
        });
    }
    return (
        <_BaseGuestLayout title="会員登録">
            <Head>
                <title>会員登録 | Tachi-No-Voice</title>
            </Head>
            <div className="text-center py-20">
                <h1 className="text-3xl">会員登録</h1>
            </div>
            <div className="bg-p-sub px-8 py-10 text-lg">
                {/* 氏名 */}
                <div>
                    <FormLabel htmlFor='name'>氏名 ※必須</FormLabel>
                    <BaseInput
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'user_name'}/>
                </div>
                {/* ニックネーム */}
                <div className="mt-4">
                    <FormLabel htmlFor='nickname'>ニックネーム</FormLabel>
                    <BaseInput
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'nickname'}/>
                    <div className='text-sm mt-1'>
                        ※ニックネーム未設定の場合は氏名が表示名として使用されます。
                    </div>
                </div>
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
                {/* パスワード */}
                <div className="mt-4">
                    <FormLabel htmlFor='password'>パスワード ※必須</FormLabel>
                    <BaseInput
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'password'}/>
                </div>
                {/* パスワード確認用 */}
                <div className="mt-4">
                    <FormLabel htmlFor='passwordConfirmation'>パスワード確認用 ※必須</FormLabel>
                    <BaseInput
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'password_confirmation'}/>
                </div>
                {/* 性別 */}
                <div className="mt-4">
                    <FormLabel htmlFor='gender'>性別 ※必須</FormLabel>
                    <FormSelect name="gender" id="gender" value={formData.gender} onChange={changeHandler}>
                        <option value=""></option>
                        <option value="1">男性</option>
                        <option value="2">女性</option>
                        <option value="3">どちらでもない</option>
                    </FormSelect>
                    <ValidationErrors validationErrors={validationError.errors} id={'gender'}/>
                </div>
                {/* 生年月日 */}
                <div className="mt-4">
                    <FormLabel htmlFor=''>生年月日 ※必須</FormLabel>
                    <div className='grid grid-cols-10'>
                        <div className='col-span-3'>
                            <YearSelect 
                                id="birthyear"
                                name="birthyear"
                                value={formData.birthyear}
                                onChange={changeHandler}
                                defaultValue='2000' 
                            />
                        </div>
                        <div className='flex items-end col-span-1'>
                            <span className='pl-2 align-bottom'>年</span>
                        </div>
                        <div className='col-span-2'>
                            <MonthSelect 
                                id="birthmonth"
                                name="birthmonth"
                                value={formData.birthmonth}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='flex items-end col-span-1'>
                            <span className='pl-2 align-bottom'>月</span>
                        </div>
                        <div className='col-span-2'>
                            <DateSelect 
                                year={formData.birthyear} 
                                month={formData.birthmonth}
                                id="birthday"
                                name="birthday"
                                value={formData.birthday}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='flex items-end col-span-1'>
                            <span className='pl-2 align-bottom'>日</span>
                        </div>
                        <div className='col-span-10'>
                            <ValidationErrors validationErrors={validationError.errors} id={'birthyear'}/>
                            <ValidationErrors validationErrors={validationError.errors} id={'birthmonth'}/>
                            <ValidationErrors validationErrors={validationError.errors} id={'birthday'}/>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <LargeButton
                        onClick={onClickSave}
                    >
                        会員登録
                    </LargeButton>
                </div>
            </div>
            <div className="mt-6 text-center text-lg">
                <Link href={RouteManager.webRoute.guest.auth.login} className='py-1'>
                    <a className="underline">既に会員の方はこちら</a>
                </Link>
            </div>
        </_BaseGuestLayout>
    )
} 