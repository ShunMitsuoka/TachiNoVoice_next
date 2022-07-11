import _BaseGuestLayout from "../../../layouts/_baseGuestLayout";
import Head from 'next/head';
import React, { useState } from "react";
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from "next";
import { AuthService } from "../../../app/services/authService";

type formData = {
    email: string;
    password: string;
};

export default function Login() {

    const [formData, setFormData] = useState<formData>({
        email: "",
        password: "",
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const onClickSave = () => {
        axios.post('http://localhost/api/auth/login', {
            email: formData.email,
            password: formData.password,
        })
            .then(function (response) {
                console.log('true');
                console.log(response);
            })
            .catch((error) => {

            });
    }


    return (
        <_BaseGuestLayout>
            <Head>
                <title>Login</title>
                <meta name="description" content="ログイン概要" />
            </Head>
            <h1 className="text-6xl text-slate-600 text-center font-serif">ログイン画面</h1>
            <div>
                <div>
                    <label htmlFor="email">メールアドレス</label>
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
                    <label htmlFor="password">パスワード</label>
                    <input
                        className="border border-slate-800"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <button
                className='bg-green-500 text-white rounded px-2 py-2'
                onClick={() => {
                    signIn('credentials', { email: formData.email, password: formData.password })
                }}
            >
                ログイン
            </button>
        </_BaseGuestLayout>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (AuthService.check(session)) {
        return AuthService.authSucceeded();
    }
    return { props: {} }
}