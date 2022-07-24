import { RouteManager } from '@/app/manages/routeManager'
import { ApiService } from '@/app/services/apiService'
import { AuthService } from '@/app/services/authService'
import { BaseButton } from '@/components/atoms/buttons/baseButton'
import { FormLabel } from '@/components/atoms/label/formLabel'
import _BaseLayout from '@/layouts/_baseLayout'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios'
import { Console } from 'console'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type villageData = {
  id: string,
  title: string,
  content: string,
  note: string,
}

const Details: NextPage = () => {


  const { data: session, status } = useSession();

  const [villageData, setVillageData] = useState<villageData>({
      id: "",
      title: "",
      content: "",
      note: "",
  });
  useEffect(() => {
      if(status === "authenticated"){
        axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource)+"/1", ApiService.getAuthHeader(session))
        .then(function (response) {
            const res = ApiService.makeApiResponse(response);
            if(res.getSuccess()){
              console.log(res);
              const result :villageData = res.getResult();
              setVillageData({
                id: result.id,
                title: result.title,
                content: result.content,
                note: result.note,
              })
            }else{
                alert('失敗');
            }
        })
      }
  },[status]);
  
  const onClickEntry = () => {
    // const params = {
    //   village_id: villageData.id
    // };
    console.log(villageData.id);
    // axios.get('/member/village/details', params)
    //     .then(function (response) {
    //         console.log('true');
    //         console.log(response);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

  }

  return (
    <_BaseMemberLayout>
      <div className='mt-5 flex justify-center'>
        <FormLabel htmlFor={'title'}>{villageData.title}</FormLabel>
      </div>
      <div className='mt-2 px-10'>
        <div className='mt-2 text-center'>
            {/* <FormLabel htmlFor={'content'} _class=''>説明</FormLabel> */}
            <p
                className='w-full border border-sub rounded-lg px-2 py-2'
            >
              {villageData.content}
            </p>
        </div>
        <div className='mt-2 text-center'>
            <FormLabel htmlFor={'note'} _class=''>注意事項</FormLabel>
            <p
                className='w-full border border-sub rounded-lg px-2 py-2'
            >
              {villageData.note}
            </p>
        </div>
        <div className='mt-2 text-center'>
            <FormLabel htmlFor={'condition'}>参加条件</FormLabel>
            <p
                className='w-full border border-sub rounded-lg px-2 py-2'
                // value={formData.content}
            >

            </p>
        </div>
        <div className='mt-2 text-center'>
            <FormLabel htmlFor={'recruitment_period'}>募集期間</FormLabel>
            <p
                className='w-full border border-sub rounded-lg px-2 py-2'
                // value={formData.content}
            >
            </p>
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
