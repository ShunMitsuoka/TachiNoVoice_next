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
    if (status === "authenticated") {
      pageLoading.show();
      axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource) + "/" + id, ApiService.getAuthHeader(session))
        .then(function (response) {
          const res = ApiService.makeApiResponse(response);
          if (res.getSuccess()) {
            console.log(res);
            const result = res.getResult();
            villageState.setVillage(result);
          } else {
            alert('失敗');
          }
        }).catch((error) => {
          alert('');
          const res = ApiService.makeApiResponse(error.response);
        }).finally(() => {
          pageLoading.close();
        })
    }
  }, [status]);

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
        if (res.getSuccess()) {
          alert("「" + villageState.village.title + "」に参加しました。");
        } else {
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
    if (villageState.village.phase_end_setting?.by_manual.is_selected) {
      contents.push(
        <div key={1}>
          {villageState.village.phase_end_setting?.by_manual.label}
        </div>);
    }
    if (villageState.village.phase_end_setting?.by_limit.is_selected) {
      contents.push(<div key={2}>{
        villageState.village.phase_end_setting?.by_limit.label
      }</div>);
    }
    if (villageState.village.phase_end_setting?.by_date.is_selected) {
      contents.push(<div key={3}>{
        villageState.village.phase_end_setting?.by_date.label
      }</div>);
    }
    return contents;
  }

  return (
    <_BaseMemberLayout>
      <div className=' flex flex-col text-center rounded-lg drop-shadow bg-white overflow-hidden shadow-lg m-20 my-5'>
        <div className='flex justify-center text-2xl  font-bold bg-sub text-white py-3 px-6'>
          <FormLabel htmlFor={'title'}>{villageState.village.title}</FormLabel>
        </div>

        <div className='grid grid-cols-12 bg-slate-100'>
          <div className='mt-3 col-span-4'>
            <FormLabel htmlFor={'content'} _class='pl-2'>内容</FormLabel>
          </div>
          <div className=' col-span-8'>
            <p
              className='pr-3 mt-3 text-left'
            >
              {villageState.village.content}
            </p>
          </div>
        </div>
        <div className='mt-3 grid grid-cols-12'>
          <div className=' col-span-4'>
            <FormLabel htmlFor={'note'} _class='pl-2'>注意事項</FormLabel>
          </div>
          <div className=' col-span-8'>
            <p
              className='pr-3 text-left'
            >
              {villageState.village.note}
            </p>
          </div>
        </div>
        <div className='mt-3 grid grid-cols-12 bg-slate-100 py-4'>
          <div className=' col-span-4'>
            <FormLabel htmlFor={'condition'} _class='pl-2'>参加条件</FormLabel>
          </div>
          <div className=' col-span-8'>
            <p
              className='pr-3 text-left'
            >
              {villageState.village.requirement}
            </p>
          </div>
        </div>
        <div className=' my-3 grid grid-cols-12'>
          <div className=' col-span-4'>
            <FormLabel htmlFor={'recruitment_period'} _class='pl-2'>募集情報</FormLabel>
          </div>
          <div
            className='pr-3 col-span-8 text-left'
          >
            {/* 募集終了条件 <br /> */}
            {
              contents()
            }
          </div>
        </div>
      </div>
      <div className="text-center">
        <BaseButton
          onClick={onClickEntry}
        >
          参加する
        </BaseButton>
      </div>

    </_BaseMemberLayout >
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
