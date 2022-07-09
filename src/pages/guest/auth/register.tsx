import axios from 'axios';
import _BaseGuestLayout from '../../../layouts/_baseGuestLayout';
import Head from 'next/head';
import React, { useState } from 'react';

type formDate = {
    name: string,
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

    const [formData, setFormData] = useState<formDate>({
        name: "",
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
        axios.post('http://localhost/api/auth/register', {
            name: formData.name,
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
            passwordConfirmation: formData.passwordConfirmation,
            gender: formData.gender,
            birthyear: formData.birthyear,
            birthmonth: formData.birthmonth,
            birthday: formData.birthday,
        })
            .then(function (response) {
                console.log(response);
            })
    }
    return (
        <_BaseGuestLayout>
            <Head>
                <title>Register</title>
            </Head>
            <h1>Register</h1>
            <div>
                <div>
                    <label htmlFor='name'>氏名 ※必須</label>
                    <input
                        className="border border-slate-800"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor='nickname'>ニックネーム</label>
                    <input
                        className="border border-slate-800"
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor='email'>メールアドレス※必須</label>
                    <input
                        className="border border-slate-800"
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor='password'>パスワード※必須</label>
                    <input
                        className="border border-slate-800"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor='passwordConfirmation'>Password確認用※必須</label>
                    <input
                        className="border border-slate-800"
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor='gender'>性別</label>
                    <input
                        className="border border-slate-800"
                        type="text"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={changeHandler}
                    />
                </div>
                <div>生年月日</div>
                <div>
                    <label htmlFor='birthyear'>年</label>
                    <input
                        className="border border-slate-800"
                        type="number"
                        id="birthyear"
                        name="birthyear"
                        value={formData.birthyear}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor='birthmonth'>月</label>
                    <input
                        className="border border-slate-800"
                        type="number"
                        id="birthmonth"
                        name="birthmonth"
                        value={formData.birthmonth}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor='birthday'>日</label>
                    <input
                        className="border border-slate-800"
                        type="text"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <button
                className='bg-green-500 text-white rounded px-2 py-2'
                onClick={onClickSave}
            >
                会員登録
            </button>
        </_BaseGuestLayout>
    )
} 