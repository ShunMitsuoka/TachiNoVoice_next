import _BaseGuestLayout from "../../../layouts/_baseGuestLayout";
import Head from 'next/head';
import React, { useState } from "react";
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from "next";
import { AuthService } from "../../../app/services/authService";
import { BaseInput } from "../../../components/atoms/input/baseInput";
import { BaseButton } from "../../../components/atoms/buttons/baseButton";
import Link from "next/link";
import { RouteManager } from "../../../app/manages/routeManager";

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
            </Head>
            <div className="text-center py-20">
                <h1 className="text-3xl text-sub">ログイン</h1>
            </div>
            <div className="bg-p-sub px-10 py-10 text-lg">
                <div>
                    <div className="mb-2">
                        <label htmlFor="email" className="text-xl font-bold">メールアドレス</label>
                    </div>
                    <BaseInput
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                    />
                </div>
                <div className="mt-4">
                    <div className="mb-2">
                        <label htmlFor="password" className="text-xl font-bold">パスワード</label>
                    </div>
                    <BaseInput
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                </div>
                <div className="text-center mt-6">
                    <BaseButton
                        onClick={() => {
                            signIn('credentials', { email: formData.email, password: formData.password })
                        }}
                    >
                        ログイン
                    </BaseButton>
                </div>
            </div>
            <div className="mt-6 text-center text-lg">
                <Link href={RouteManager.webRoute.guest.auth.register}>
                    <a className="underline">新規会員登録はこちら</a>
                </Link>
            </div>
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