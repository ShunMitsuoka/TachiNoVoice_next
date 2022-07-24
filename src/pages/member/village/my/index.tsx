import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import { useEffect } from 'react';

const MyVillage: NextPage = () => {

  const { data: session, status } = useSession();

  useEffect(() => {
    if(status === "authenticated"){
      axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.my.index), ApiService.getAuthHeader(session))
      .then(function (response) {
          const res = ApiService.makeApiResponse(response);
          if(res.getSuccess()){
            console.log(res);
          }else{
              alert('失敗');
          }
      })
    }
},[status]);


  return (
    <_BaseMemberLayout title='ビレッジ'>
      <Head>
          <title>My ビレッジ</title>
      </Head>
      <div className=''>
          参加中ビレッジ一覧
      </div>
  </_BaseMemberLayout>
  )
}

export default MyVillage
