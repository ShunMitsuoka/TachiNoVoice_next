import { RouteManager } from '@/app/manages/routeManager'
import { ApiService } from '@/app/services/apiService'
import { AuthService } from '@/app/services/authService'
import { BaseButton } from '@/components/atoms/buttons/baseButton'
import { FormLabel } from '@/components/atoms/label/formLabel'
import { usePageLoading } from '@/hooks/common/usePageLoading'
import { useVillage } from '@/hooks/components/member/village/my/useVillage'
import _BaseLayout from '@/layouts/_baseLayout'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios'
import { Console } from 'console'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'

const Details: NextPage = () => {


  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();

  const router = useRouter();
  const { id } = router.query;

  const villageState = useVillage();

  useEffect(() => {
      if(status === "authenticated"){
        pageLoading.show();
        axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource)+"/"+id, ApiService.getAuthHeader(session))
        .then(function (response) {
            const res = ApiService.makeApiResponse(response);
            if(res.getSuccess()){
              console.log(res);
              const result = res.getResult();
              villageState.setVillage(result);
            }else{
                alert('失敗');
            }
        }).catch((error) => {
          alert('');
          const res = ApiService.makeApiResponse(error.response);
        }).finally(() => {
            pageLoading.close();
        })
      }
  },[status]);
  
  const onClickEntry = async () => {
    const params = {
      village_id: villageState.village.village_id
    };
    // console.log(villageData.id);
      pageLoading.show();
      await ApiService.getCSRF();
      axios.post(ApiService.getFullURL(RouteManager.apiRoute.member.village.join), params, ApiService.getAuthHeader(session))
      .then(function (response) {
          const res = ApiService.makeApiResponse(response);
          if(res.getSuccess()){
              alert("「"+villageState.village.title+"」に参加しました。");
          }else{
              alert('失敗');
          }
      })
      .catch((error) => {
          alert('登録失敗');
          const res = ApiService.makeApiResponse(error.response);
      }).finally(() => {
          pageLoading.close();
      })
  }

  const contents = () => {
    let contents = [];
    if(villageState.village.phase_end_setting?.by_manual){
      contents.push(<div key={1}>手動で終了</div>);
    }
    if(villageState.village.phase_end_setting?.by_limit){
      contents.push(<div key={2}>定員になり次第終了</div>);
    }
    if(villageState.village.phase_end_setting?.by_date){
      contents.push(<div key={3}>期限になり次第終了</div>);
    }
    return contents;
  }

  return (
    <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding}>
      <div className='mt-5 flex justify-center'>
        <FormLabel htmlFor={'title'}>{villageState.village.title}</FormLabel>
      </div>
      <div className='mt-2 px-10'>
        <div className='mt-2 text-center'>
            <p
                className='w-full rounded-lg px-2 py-2'
            >
              {villageState.village.content}
            </p>
        </div>
        <div className='mt-4 text-center'>
            <FormLabel htmlFor={'note'} _class=''>注意事項</FormLabel>
            <p
                className='w-full rounded-lg px-2 py-2'
            >
              {villageState.village.note}
            </p>
        </div>
        <div className='mt-4 text-center'>
            <FormLabel htmlFor={'condition'}>参加条件</FormLabel>
            <p
                className='w-full rounded-lg px-2 py-2'
            >
              {villageState.village.requirement}
            </p>
        </div>
        <div className='mt-4 text-center'>
            <FormLabel htmlFor={'recruitment_period'}>募集情報</FormLabel>
            <div
              className='w-full rounded-lg px-2 py-2'
            >
              {/* 募集終了条件 <br /> */}
              {
                contents()
              }
            </div>
        </div>
        <div className="text-center mt-6">
            <BaseButton
              onClick={onClickEntry}
            >
                参加する
            </BaseButton>
        </div>
      </div>
    </_BaseMemberLayout>
  )
}

export default Details

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
      return { props: {} }
  }
  return AuthService.authFailed();
}
