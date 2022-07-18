import _BaseGuestLayout from '../../../layouts/_baseGuestLayout';
import Head from 'next/head';
import React, { useState } from 'react';
import { BaseInput } from '../../../components/atoms/input/baseInput';
import { BaseButton } from '../../../components/atoms/buttons/baseButton';
import { FormLabel } from '../../../components/atoms/label/formLabel';
import axios from '../../../libs/axios/axios';
import { ApiService } from '@/app/services/apiService';
import { ValidationErrorService } from '@/app/services/validationErrorService';
import { ValidationErrors } from '@/components/modules/common/validation/validationErrors';
import Link from 'next/link';
import { RouteManager } from '@/app/manages/routeManager';

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

    const [validationError, setValidationError] = useState<any>(null);

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

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const onClickSave = () => {
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
        console.log(params);
        axios.post('http://localhost:8000/api/auth/register', params)
        .then(function (response) {
            console.log(response);
        })
        .catch((error) =>{
            const res = ApiService.makeApiErrorResponse(error);
            ValidationErrorService.setValidtionError(res, setValidationError);
        })
    }
    return (
        <_BaseGuestLayout>
            <Head>
                <title>Register</title>
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
                    <ValidationErrors validationErrors={validationError} id={'user_name'}/>
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
                    <ValidationErrors validationErrors={validationError} id={'nickname'}/>
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
                    <ValidationErrors validationErrors={validationError} id={'email'}/>
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
                    <ValidationErrors validationErrors={validationError} id={'password'}/>
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
                    <ValidationErrors validationErrors={validationError} id={'password_confirmation'}/>
                </div>
                {/* 性別 */}
                <div className="mt-4">
                    <FormLabel htmlFor='gender'>性別 ※必須</FormLabel>
                    <BaseInput
                        type="text"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError} id={'gender'}/>
                </div>
                {/* 生年月日 */}
                <div className="mt-4">
                    <FormLabel htmlFor=''>生年月日 ※必須</FormLabel>
                    <div className='grid grid-cols-10'>
                        <div className='col-span-4'>
                            <BaseInput
                                type="number"
                                id="birthyear"
                                name="birthyear"
                                value={formData.birthyear}
                                onChange={changeHandler}
                                _class='w-20 text-right'
                            />
                            <span className='pl-2 align-bottom'>年</span>
                        </div>
                        <div className='col-span-3'>
                            <BaseInput
                                type="number"
                                id="birthmonth"
                                name="birthmonth"
                                value={formData.birthmonth}
                                onChange={changeHandler}
                                _class='w-14 text-right'
                            />
                            <span className='pl-2 align-bottom'>月</span>
                        </div>
                        <div className='col-span-3'>
                            <BaseInput
                                type="text"
                                id="birthday"
                                name="birthday"
                                value={formData.birthday}
                                onChange={changeHandler}
                                _class='w-14 text-right'
                                />
                                <span className='pl-2 align-bottom'>日</span>
                        </div>
                        <div className='col-span-10'>
                            <ValidationErrors validationErrors={validationError} id={'birthyear'}/>
                            <ValidationErrors validationErrors={validationError} id={'birthmonth'}/>
                            <ValidationErrors validationErrors={validationError} id={'birthday'}/>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <BaseButton
                        onClick={onClickSave}
                    >
                        会員登録
                    </BaseButton>
                </div>
            </div>
            <div className="mt-6 text-center text-lg">
                <Link href={RouteManager.webRoute.guest.auth.login}>
                    <a className="underline">既に会員の方はこちら</a>
                </Link>
            </div>
        </_BaseGuestLayout>
    )
} 