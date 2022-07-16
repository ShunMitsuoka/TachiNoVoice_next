import { RouteManager } from '@/app/manages/routeManager'
import { ApiService } from '@/app/services/apiService'
import { AuthService } from '@/app/services/authService'
import { BaseButton } from '@/components/atoms/buttons/baseButton'
import { FormInput } from '@/components/atoms/input/formInput'
import { FormLabel } from '@/components/atoms/label/formLabel'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useState } from 'react'

type formData = {
    title: string,
    content: string,
    note: string,
    core_member_limit : string,
    requirement: string,
    nickname_flg:boolean,
    gender_flg:boolean,
    age_flg:boolean,
    start : {
        by_manual_flg:boolean,
        by_instant_flg:boolean,
        by_date_flg:boolean,
    }
    end : {
        by_manual_flg:boolean,
        by_limit_flg:boolean,
        by_date_flg:boolean,
    }
}

const Register: NextPage = () => {

    const { data: session, status } = useSession();

    const [page, setPage] = useState<number>(1);

    const [formData, setFormData] = useState<formData>({
        title: "",
        content: "",
        note: "",
        core_member_limit : '10',
        requirement : '',
        nickname_flg:false,
        gender_flg:false,
        age_flg:false,
        start : {
            by_manual_flg:true,
            by_instant_flg:true,
            by_date_flg:false,
        },
        end : {
            by_manual_flg:true,
            by_limit_flg:true,
            by_date_flg:false,
        }
    });

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setFormData(prevValues => {
            return { ...prevValues, [target.name]: value }
        });
    }

    const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target;
        const value = target.value;
        setFormData(prevValues => {
            return { ...prevValues, [target.name]: value }
        });
    }

    const onClickNext = () => {
        setPage(page+1);
    }

    const onClickCancel = () => {
        setPage(page-1);
    }

    const onClickRegister = async () => {
        await ApiService.getCSRF();
        axios.post(ApiService.getFullURL(RouteManager.apiRoute.member.village), formData, ApiService.getAuthHeader(session))
        .then(function (response) {
            const res = ApiService.makeApiResponse(response);
            if(res.getSuccess()){
                setPage(page+1);
            }else{
                alert('登録失敗');
            }
        })
        .catch((error) => {
            alert('登録失敗');
            const res = ApiService.makeApiResponse(error.response);
        })
    }


    const pageSegue = () => {
        switch (page) {
            case 1:
                return(
                    <>
                        <div>
                            <FormLabel htmlFor={'title'}>タイトル</FormLabel>
                            <FormInput
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={changeInputHandler}
                            />
                        </div>
                        <div className='mt-2'>
                            <FormLabel htmlFor={'content'}>説明</FormLabel>
                            <textarea
                                name="content"
                                id="content"
                                cols={30}
                                rows={6}
                                className='w-full border border-sub rounded-lg px-2 py-2'
                                value={formData.content}
                                onChange={changeTextAreaHandler}
                            >
                            </textarea>
                        </div>
                        <div className='mt-2'>
                            <FormLabel htmlFor={'note'}>注意事項</FormLabel>
                            <textarea
                                name="note"
                                id="note"
                                cols={30}
                                rows={6}
                                className='w-full border border-sub rounded-lg px-2 py-2'
                                value={formData.note}
                                onChange={changeTextAreaHandler}
                            >
                            </textarea>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div>
                                <BaseButton>キャンセル</BaseButton>
                            </div>
                            <div>
                                <BaseButton onClick={onClickNext}>次へ</BaseButton>
                            </div>
                        </div>
                    </>
                );
                break;
            case 2:
                return(
                    <>
                        <div>
                            <FormLabel htmlFor={'core_member_limit'}>コアメンバー</FormLabel>
                            <div className='w-96'>
                                <FormInput
                                    type='number'
                                    id='core_member_limit'
                                    name='core_member_limit'
                                    value={formData.core_member_limit}
                                    onChange={changeInputHandler}
                                    _class='w-24 text-right'
                                />
                                <div className='inline-block ml-4'>
                                    人
                                </div>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <FormLabel htmlFor={'requirement'}>条件</FormLabel>
                            <textarea
                                name="requirement"
                                id="requirement"
                                cols={30}
                                rows={6}
                                className='w-full border border-sub rounded-lg px-2 py-2'
                                value={formData.requirement}
                                onChange={changeTextAreaHandler}
                            >
                            </textarea>
                        </div>
                        <div className='mt-2'>
                            <FormLabel htmlFor={''}>開始条件</FormLabel>
                            <div className='flex items-center'>
                                <input 
                                    type={'checkbox'} 
                                    name="nickname_flg" 
                                    id="nickname_flg" 
                                    checked={formData.nickname_flg}
                                    onChange={changeInputHandler}
                                /> 
                                <FormLabel htmlFor={'nickname_flg'}>ニックネーム</FormLabel>
                            </div>
                            <div className='flex items-center'>
                                <input 
                                    type={'checkbox'} 
                                    name="age_flg" 
                                    id="age_flg" 
                                    checked={formData.age_flg}
                                    onChange={changeInputHandler}
                                /> 
                                <FormLabel htmlFor={'age_flg'}>年齢</FormLabel>
                            </div>
                            <div className='flex items-center'>
                                <input 
                                    type={'checkbox'} 
                                    name="gender_flg" 
                                    id="gender_flg" 
                                    checked={formData.gender_flg}
                                    onChange={changeInputHandler}
                                /> 
                                <FormLabel htmlFor={'gender_flg'}>性別</FormLabel>
                            </div>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div>
                                <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                            </div>
                            <div>
                                <BaseButton onClick={onClickNext}>次へ</BaseButton>
                            </div>
                        </div>
                    </>
                );
                break;
                case 3:
                    return(
                        <>
                            <div className='mt-2'>
                                <FormLabel htmlFor={''}>募集開始条件</FormLabel>
                                <div className='flex items-center'>
                                    <input 
                                        type={'radio'} 
                                        name="start.by_instant_flg" 
                                        id="start.by_instant_flg" 
                                        checked={formData.start.by_instant_flg}
                                        onChange={changeInputHandler}
                                    /> 
                                    <FormLabel htmlFor={'start.by_instant_flg'}>ビレッジ作成後、即時募集開始</FormLabel>
                                </div>
                            </div>

                            <div className='flex justify-between mt-4'>
                                <div>
                                    <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                                </div>
                                <div>
                                    <BaseButton onClick={onClickNext}>次へ</BaseButton>
                                </div>
                            </div>
                        </>
                    );
                    break;
                case 4:
                    return(
                        <>
                            <div className='mt-2'>
                                <FormLabel htmlFor={''}>募集終了条件</FormLabel>
                                <div className='flex items-center'>
                                    <input 
                                        type={'radio'} 
                                        name="end.by_limit_flg" 
                                        id="end.by_limit_flg" 
                                        checked={formData.end.by_limit_flg}
                                        onChange={changeInputHandler}
                                    /> 
                                    <FormLabel htmlFor={'end.by_limit_flg'}>定員になり次第終了</FormLabel>
                                </div>
                            </div>

                            <div className='flex justify-between mt-4'>
                                <div>
                                    <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                                </div>
                                <div>
                                    <BaseButton onClick={onClickNext}>次へ</BaseButton>
                                </div>
                            </div>
                        </>
                    );
                    break;
                case 5:
                    return(
                        <>
                            <div>
                                <span className='text-xl font-bold'>タイトル</span>
                                <div>
                                    {formData.title}
                                </div>
                            </div>
                            <div>
                                <span className='text-xl font-bold'>説明</span>
                                <div>
                                    {formData.content}
                                </div>
                            </div>
                            <div>
                                <span className='text-xl font-bold'>注意事項</span>
                                <div>
                                    {formData.note}
                                </div>
                            </div>
                            <div>
                                <span className='text-xl font-bold'>コアメンバー</span>
                                <div>
                                    {formData.core_member_limit}人
                                </div>
                            </div>
                            <div>
                                <span className='text-xl font-bold'>条件</span>
                                <div>
                                    {formData.requirement}
                                </div>
                            </div>
                            <div>
                                <span className='text-xl font-bold'>開示情報</span>
                                <div>
                                    {formData.nickname_flg && '・ニックネーム'}
                                    {formData.age_flg && '・年齢'}
                                    {formData.gender_flg && '・性別'}
                                </div>
                            </div>
                            <div>
                                <span className='text-xl font-bold'>募集開始条件</span>
                                <div>
                                    ビレッジ作成後、即時募集開始
                                </div>
                            </div>
                            <div>
                                <span className='text-xl font-bold'>募集終了条件</span>
                                <div>
                                    定員になり次第終了
                                </div>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <div>
                                    <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                                </div>
                                <div>
                                    <BaseButton onClick={onClickRegister}>作成</BaseButton>
                                </div>
                            </div>
                        </>
                    );
                    break;
                case 6:
                    return(
                        <>
                            <div>
                                ビレッジを作成しました
                            </div>
                        </>
                    );
                    break;
            default:
                break;
        }
    }

    return (
        <_BaseMemberLayout>
            <Head>
                <title>ビレッジ設定</title>
            </Head>
            <div className='px-10 mt-10'>
                {pageSegue()}
            </div>
        </_BaseMemberLayout>
    )
}

export default Register

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}