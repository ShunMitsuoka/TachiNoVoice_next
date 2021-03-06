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

    const getValue = useEffect(() => {

    }, []);

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
        console.log(params);
        axios.post('http://localhost:8000/api/auth/register', params)
        .then(function (response) {
            alert('????????????????????????????????????\n?????????????????????????????????')
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
        <_BaseGuestLayout title="????????????" pageLoding={pageLoading.isPageLaoding}>
            <Head>
                <title>Register</title>
            </Head>
            <div className="text-center py-20">
                <h1 className="text-3xl">????????????</h1>
            </div>
            <div className="bg-p-sub px-8 py-10 text-lg">
                {/* ?????? */}
                <div>
                    <FormLabel htmlFor='name'>?????? ?????????</FormLabel>
                    <BaseInput
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'user_name'}/>
                </div>
                {/* ?????????????????? */}
                <div className="mt-4">
                    <FormLabel htmlFor='nickname'>??????????????????</FormLabel>
                    <BaseInput
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'nickname'}/>
                </div>
                {/* ????????????????????? */}
                <div className="mt-4">
                    <FormLabel htmlFor='email'>????????????????????? ?????????</FormLabel>
                    <BaseInput
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'email'}/>
                </div>
                {/* ??????????????? */}
                <div className="mt-4">
                    <FormLabel htmlFor='password'>??????????????? ?????????</FormLabel>
                    <BaseInput
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'password'}/>
                </div>
                {/* ???????????????????????? */}
                <div className="mt-4">
                    <FormLabel htmlFor='passwordConfirmation'>???????????????????????? ?????????</FormLabel>
                    <BaseInput
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={changeHandler}
                    />
                    <ValidationErrors validationErrors={validationError.errors} id={'password_confirmation'}/>
                </div>
                {/* ?????? */}
                <div className="mt-4">
                    <FormLabel htmlFor='gender'>?????? ?????????</FormLabel>
                    <FormSelect name="gender" id="gender" value={formData.gender} onChange={changeHandler}>
                        <option value=""></option>
                        <option value="1">??????</option>
                        <option value="2">??????</option>
                        <option value="3">?????????????????????</option>
                    </FormSelect>
                    <ValidationErrors validationErrors={validationError.errors} id={'gender'}/>
                </div>
                {/* ???????????? */}
                <div className="mt-4">
                    <FormLabel htmlFor=''>???????????? ?????????</FormLabel>
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
                            <span className='pl-2 align-bottom'>???</span>
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
                            <span className='pl-2 align-bottom'>???</span>
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
                            <span className='pl-2 align-bottom'>???</span>
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
                        ????????????
                    </LargeButton>
                </div>
            </div>
            <div className="mt-6 text-center text-lg">
                <Link href={RouteManager.webRoute.guest.auth.login}>
                    <a className="underline">??????????????????????????????</a>
                </Link>
            </div>
        </_BaseGuestLayout>
    )
} 