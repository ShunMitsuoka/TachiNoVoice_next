import _BaseGuestLayout from "../../../layouts/_baseGuestLayout";
import Head from 'next/head';
import React, { useState } from "react";
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from "next";
import { AuthService } from "../../../app/services/authService";
import { BaseInput } from "../../../components/atoms/input/baseInput";
import Link from "next/link";
import { RouteManager } from "../../../app/manages/routeManager";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useRouter } from "next/router";
import { LargeButton } from "@/components/atoms/buttons/largeButton";

type formData = {
    email: string;
    password: string;
};

export default function Login() {
    const router = useRouter()
    const pageLoading = usePageLoading();

    const [formData, setFormData] = useState<formData>({
        email: "",
        password: "",
    });

    const [isError, setIsError] = useState<boolean>(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const onClickLoginBtn = () => {
        pageLoading.show();
        signIn('credentials', { 
            email: formData.email, 
            password: formData.password,
            redirect: false,
        })
        .then((response) => {
            if(response?.ok){
                setIsError(false);
                router.replace(RouteManager.webRoute.member.dashboard);
            }else{
                setIsError(true);
            }
        })
        .catch((error) => {
            setIsError(true);
        })
        .finally(() => {
            pageLoading.close();
        });
    }

    return (
        <_BaseGuestLayout title="LOGIN">
            <Head>
                <title>LOGIN | Tachi-No-Voice</title>
            </Head>
            <div className="text-center py-20">
                <h1 className="text-3xl">ログイン</h1>
            </div>
            <div className="bg-p-sub px-8 py-8 text-lg">
                {
                    isError && 
                    <div className="text-center mb-4">
                        <span className=" text-xl text-rose-500">
                            ログインに失敗しました。
                        </span>
                    </div>
                }
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
                    <LargeButton
                        onClick={onClickLoginBtn}
                    >
                        ログイン
                    </LargeButton>
                </div>
            </div>
            <div className="mt-6 text-center text-lg">
                <Link href={RouteManager.webRoute.guest.auth.register} className='py-1'>
                    <a className="underline">新規会員登録はこちら</a>
                </Link>
            </div>
        </_BaseGuestLayout>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if(!AuthService.isEmailVerified(session)) return { props: {} };
    if (AuthService.check(session)) {
        return AuthService.authSucceeded();
    }
    return { props: {} }
}