import { RouteManager } from '@/app/manages/routeManager'
import { ApiService } from '@/app/services/apiService'
import { AuthService } from '@/app/services/authService'
import { CompleteRegisterVillage } from '@/components/templates/member/village/register/setting/completeRegisterVillage'
import { ConfirmVillageSetting } from '@/components/templates/member/village/register/setting/confirmVillageSetting'
import { SetTopic } from '@/components/templates/member/village/register/setting/setTopic'
import { SetVillageEndRequirement } from '@/components/templates/member/village/register/setting/setVillageEndRequirement'
import { SetVillageSetting } from '@/components/templates/member/village/register/setting/setVillageSetting'
import { SetVillageStartRequirement } from '@/components/templates/member/village/register/setting/setVillageStartRequirement'
import { usePageLoading } from '@/hooks/common/usePageLoading'
import { useValidationError } from '@/hooks/common/useValidationError'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export type formData = {
    title: string,
    content: string,
    note: string,
    village_member_limit : string,
    core_member_limit : string,
    requirement: string,
    gender_flg:boolean,
    age_flg:boolean,
    start_by_instant_flg:boolean,
    start_by_date_flg:boolean,
    end_by_limit_flg:boolean,
    end_by_date_flg:boolean,
}

type pageInfo = {
    title : React.ReactNode,
    component : React.ReactNode,
}

const Register: NextPage = () => {

    const { data: session, status } = useSession();
    const pageLoading = usePageLoading();
    const router = useRouter()
    const [page, setPage] = useState<number>(1);
    const [formData, setFormData] = useState<formData>({
        title: "",
        content: "",
        note: "",
        village_member_limit : '30',
        core_member_limit : '10',
        requirement : '',
        gender_flg:true,
        age_flg:true,
        start_by_instant_flg:true,
        start_by_date_flg:false,
        end_by_limit_flg:false,
        end_by_date_flg:false,
    });
    const validationError = useValidationError();


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

    const onClickNext = async () => {
        pageLoading.show();
        let validationUrl:string | null = null;
        switch (page) {
            case 1:
                validationUrl = RouteManager.apiRoute.member.village.register.validation.topic;
                break;
            case 2:
                validationUrl = RouteManager.apiRoute.member.village.register.validation.setting;
                break;       
            default:
                break;
        }
        if(validationUrl){
            await ApiService.getCSRF();
            await axios.post(ApiService.getFullURL(validationUrl), formData, ApiService.getAuthHeader(session))
            .then(function (response) {
                validationError.clearError();
                setPage(page+1);
            })
            .catch((error) => {
                const res = ApiService.makeApiErrorResponse(error);
                validationError.showError(res);
            })
        }else{
            setPage(page+1);
        }
        pageLoading.close();
    }

    const onClickCancel = () => {
        setPage(page-1);
    }

    const onClickCancelRegister = () => {
        router.replace(RouteManager.webRoute.member.village.register.index);
    }

    const onClickRegister = async () => {
        pageLoading.show();
        await ApiService.getCSRF();
        axios.post(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource), formData, ApiService.getAuthHeader(session))
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
        .finally(() => {
            pageLoading.close();
        })
    }

    const pageInfo = () : pageInfo => {
        let result:pageInfo = {
            title : null,
            component : null,
        }
        switch (page) {
            case 1:
                result.title = '問題設定';
                result.component =
                <SetTopic 
                    formData={formData} 
                    changeInputHandler={changeInputHandler} 
                    changeTextAreaHandler={changeTextAreaHandler}
                    onClickNext={onClickNext} 
                    onClickCancel={onClickCancelRegister} 
                    validationError={validationError}
                />;
                break;
            case 2:
                result.title = (<>ビレッジメンバー<br />募集条件設定</>);
                result.component =
                <SetVillageSetting 
                    formData={formData} 
                    changeInputHandler={changeInputHandler} 
                    changeTextAreaHandler={changeTextAreaHandler}
                    onClickNext={onClickNext} 
                    onClickCancel={onClickCancel} 
                    validationError={validationError}
                />;
                break;
                case 3:
                    result.title = (<>ビレッジメンバー<br />募集開始条件設定</>);
                    result.component =
                    <SetVillageStartRequirement
                        formData={formData} 
                        changeInputHandler={changeInputHandler} 
                        changeTextAreaHandler={changeTextAreaHandler}
                        onClickNext={onClickNext} 
                        onClickCancel={onClickCancel} 
                    />;
                    break;
                case 4:
                    result.title = (<>ビレッジメンバー<br />募集終了条件設定</>);
                    result.component =
                    <SetVillageEndRequirement
                        formData={formData} 
                        changeInputHandler={changeInputHandler} 
                        changeTextAreaHandler={changeTextAreaHandler}
                        onClickNext={onClickNext} 
                        onClickCancel={onClickCancel} 
                    />;
                    break;
                case 5:
                    result.title = (<>ビレッジ確認</>);
                    result.component =
                    <ConfirmVillageSetting 
                        formData={formData} 
                        onClickRegister={onClickRegister} 
                        onClickCancel={onClickCancel} 
                    />;
                    break;
                case 6:
                    result.title = (<>ビレッジを作成完了</>);
                    result.component = <CompleteRegisterVillage />;
                    break;
            default:
                break;
        }
        return result;
    }

    return (
        <_BaseMemberLayout isShowBgDecoration={false}>
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
            <div className='text-2xl text-center leading-relaxed'>
                {pageInfo().title}
            </div>
            <div className='mt-6'>
                {pageInfo().component}
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