import { RouteManager } from '@/app/manages/routeManager'
import { ApiService } from '@/app/services/apiService'
import { AuthService } from '@/app/services/authService'
import { ConfirmVillageSetting } from '@/components/templates/member/village/register/setting/confirmVillageSetting'
import { SetTopic } from '@/components/templates/member/village/register/setting/setTopic'
import { SetVillageEndRequirement } from '@/components/templates/member/village/register/setting/setVillageEndRequirement'
import { SetVillageSetting } from '@/components/templates/member/village/register/setting/setVillageSetting'
import { SetVillageStartRequirement } from '@/components/templates/member/village/register/setting/setVillageStartRequirement'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
    const router = useRouter()
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

    const onClickCancelRegister = () => {
        router.replace(RouteManager.webRoute.member.village.register.index);
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


    const pageContent = () => {
        switch (page) {
            case 1:
                return(
                    <SetTopic 
                        formData={formData} 
                        changeInputHandler={changeInputHandler} 
                        changeTextAreaHandler={changeTextAreaHandler}
                        onClickNext={onClickNext} 
                        onClickCancel={onClickCancelRegister} 
                    />
                );
                break;
            case 2:
                return(
                    <SetVillageSetting 
                        formData={formData} 
                        changeInputHandler={changeInputHandler} 
                        changeTextAreaHandler={changeTextAreaHandler}
                        onClickNext={onClickNext} 
                        onClickCancel={onClickCancel} 
                    />
                );
                break;
                case 3:
                    return(
                        <SetVillageStartRequirement
                            formData={formData} 
                            changeInputHandler={changeInputHandler} 
                            changeTextAreaHandler={changeTextAreaHandler}
                            onClickNext={onClickNext} 
                            onClickCancel={onClickCancel} 
                        />
                    );
                    break;
                case 4:
                    return(
                        <SetVillageEndRequirement
                            formData={formData} 
                            changeInputHandler={changeInputHandler} 
                            changeTextAreaHandler={changeTextAreaHandler}
                            onClickNext={onClickNext} 
                            onClickCancel={onClickCancel} 
                        />
                    );
                    break;
                case 5:
                    return(
                        <ConfirmVillageSetting 
                            formData={formData} 
                            onClickRegister={onClickRegister} 
                            onClickCancel={onClickCancel} 
                        />
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
            <div className='relative h-32 flex justify-center items-center px-10'>
                {
                    [1,2,3,4,5,6].map((index) => {
                        return (
                            <div key={index} className='flex items-center'>
                                { page == index ?
                                    <div className='h-7 w-7 rounded-full bg-sub'></div>
                                :   <div className='h-7 w-7 rounded-full bg-white border-2 border-sub'></div>
                                }
                                { index < 6 &&
                                <div className='h-1 w-8 bg-sub'></div>
                                }
                            </div>
                        );
                    })
                }
            </div>
            <div className=''>
                {pageContent()}
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