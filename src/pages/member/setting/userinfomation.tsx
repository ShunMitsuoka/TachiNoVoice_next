import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useEffect, useState } from "react";
import axios from "@/libs/axios/axios";
import { ApiService } from "@/app/services/apiService";
import { RouteManager } from "@/app/manages/routeManager";
import { useValidationError } from "@/hooks/common/useValidationError";
import { FormLabel } from "@/components/atoms/label/formLabel";
import { BaseInput } from "@/components/atoms/input/baseInput";
import { ValidationErrors } from "@/components/modules/common/validation/validationErrors";
import { FormSelect } from "@/components/atoms/select/formSelect";
import { YearSelect } from "@/components/modules/common/dateSelect/yearSelect";
import { MonthSelect } from "@/components/modules/common/dateSelect/monthSelect";
import { DateSelect } from "@/components/modules/common/dateSelect/dateSelect";
import { LargeButton } from "@/components/atoms/buttons/largeButton";
import { useModal } from "@/hooks/common/useModal";
import { AuthService } from "@/app/services/authService";
import { getSession, useSession } from 'next-auth/react';
import { useSweetAlert } from "@/hooks/common/useSweetalert";
import Image from "next/image";
import { SectionTitle } from "@/components/modules/common/section/sectionTitle";

type formData = {
    user_id: string,
    user_name: string,
    nickname: string,
    password: string,
    email: string,
    gender: string,
    birthyear: string,
    birthmonth: string,
    birthday: string,
}

const Userinfomation: NextPage = () => {
    const sweet = useSweetAlert();
    const { data: session, status } = useSession();
    const pageLoading = usePageLoading();
    const validationError = useValidationError();
    const [formData, setFormData] = useState<formData>({
        user_id: "",
        user_name: "",
        nickname: "",
        password: "",
        email: "",
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
    useEffect(() => {
        if (status === "authenticated") {
            pageLoading.show();
            axios.get(ApiService.getFullURL(
                RouteManager.apiRoute.member.index
            ), ApiService.getAuthHeader(session))
            .then(async function (response) {
                console.log('response', response);
                const res = ApiService.makeApiResponse(response);
                if (res.getSuccess()) {
                    const result = res.getResult();
                    setFormData(result);
                } else {
                    await sweet.error("ユーザー情報の取得に失敗しました", "");
                }
            })
            .catch(async (error) => {
                await sweet.error("ユーザー情報の取得に失敗しました", "");
                console.log('error', error);
            })
            .finally(async () => {
                pageLoading.close();
            })
        }
    }, [status]);

    const onClickChangeData = () => {
        pageLoading.show();
        validationError.clearError();
        const params = {
            userId: formData.user_id,
            user_name: formData.user_name,
            nickname: formData.nickname,
            email: formData.email,
            gender: formData.gender,
            birthyear: formData.birthyear,
            birthmonth: formData.birthmonth,
            birthday: formData.birthday,
            password: formData.password,
        };
        axios.post(ApiService.getFullURL(
            RouteManager.apiRoute.member.index
        ), params, ApiService.getAuthHeader(session))
            .then(async function (response) {
                await sweet.success("変更が反映されました", "OKをタッチしてください");
            })
            .catch(async (error) => {
                const res = ApiService.makeApiErrorResponse(error);
                validationError.showError(res);
                await sweet.error("変更に失敗しました", "もう一度変更してください");
            })
            .finally(async () => {
                pageLoading.close();
            })
    }

    return (
        <_BaseMemberLayout title='ユーザー情報設定'>
            <Head>
                <title>ユーザー情報設定</title>
            </Head>
            <div className="absolute top-2 right-2">
                <Image
                    src={'/images/common/decoration/tr-deco.svg'}
                    width={300}
                    height={130}
                />
            </div>
            <div className="pt-10">
                <div className="px-8 py-3 text-lg">
                    <SectionTitle>現在のユーザー情報</SectionTitle>
                    {/*　氏名　*/}
                    <div className="position relative mt-4">
                        <FormLabel htmlFor="user_name">氏名</FormLabel>
                        <BaseInput
                            type="text"
                            id="user_name"
                            name="user_name"
                            value={formData.user_name}
                            onChange={changeHandler}
                        />
                        <ValidationErrors validationErrors={validationError.errors} id={'user_name'} />
                    </div>
                    {/*　ニックネーム　*/}
                    <div className="mt-4">
                        <FormLabel htmlFor="nickname">ニックネーム</FormLabel>
                        <BaseInput
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={formData.nickname}
                            onChange={changeHandler}
                        />
                        <ValidationErrors validationErrors={validationError.errors} id={'nickname'} />
                        <div className='text-sm mt-1'>
                            ※ニックネーム未設定の場合は氏名が表示名として使用されます。
                        </div>

                    </div>
                    {/* Email　*/}
                    <div className="mt-4">
                        <FormLabel htmlFor="text">メールアドレス</FormLabel>
                        <BaseInput
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                        />
                        <ValidationErrors validationErrors={validationError.errors} id={'email'} />
                    </div>
                    {/* パスワード */}
                    <div className="mt-4">
                        <FormLabel htmlFor="password">パスワード</FormLabel>
                        <BaseInput
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                        />
                        <ValidationErrors validationErrors={validationError.errors} id={'password'} />
                        <div className='text-sm mt-1'>
                            ※パスワードを変更したい場合は入力してください
                        </div>
                    </div>
                    {/*　性別　*/}
                    <div className="mt-4">
                        <FormLabel htmlFor="gender">性別</FormLabel>
                        <FormSelect name="gender" id="gender" value={formData.gender} onChange={changeHandler}>
                            <option value=""></option>
                            <option value="1">男性</option>
                            <option value="2">女性</option>
                            <option value="3">どちらでもない</option>
                        </FormSelect>
                        <ValidationErrors validationErrors={validationError.errors} id={'gender'} />
                    </div>
                    {/* 生年月日 */}
                    <div className="mt-4">
                        <FormLabel htmlFor=''>生年月日</FormLabel>
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
                                <ValidationErrors validationErrors={validationError.errors} id={'birthyear'} />
                                <ValidationErrors validationErrors={validationError.errors} id={'birthmonth'} />
                                <ValidationErrors validationErrors={validationError.errors} id={'birthday'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <LargeButton onClick={onClickChangeData}>
                        変更する
                    </LargeButton>
                </div>
            </div>
        </_BaseMemberLayout >
    )
}
export default Userinfomation;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}