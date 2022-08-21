import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Village } from 'villageType';

const MyVillage: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const [lists, setLists] = useState<Village[]>([]);

  useEffect(() => {
    pageLoading.show();
    if(status === "authenticated"){
      axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.my.index), ApiService.getAuthHeader(session))
      .then(function (response) {
          const res = ApiService.makeApiResponse(response);
          if(res.getSuccess()){
            const result = res.getResult();
            setLists(result);
            console.log(res);
          }else{
              alert('失敗');
          }
      })
      .finally(() => {
        pageLoading.close();
      });
    }
  },[status]);

  return (
    <_BaseMemberLayout title='ビレッジ'>
      <Head>
          <title>My ビレッジ</title>
      </Head>
      <div className=''>
          参加中ビレッジ一覧
          <div className=' px-10'>
            {
              lists.map((village, index) => {
                return (
                  <Link key={index} href={RouteManager.webRoute.member.village.my.details.index + village.village_id}>
                    <div className='bg-white rounded-lg drop-shadow-lg mt-6'>
                      <div className='px-4 py-6 text-center'>{village.title}</div>
                      <div>{village.phase_name}</div>
                    </div>
                  </Link>
                );
              })
            }
          </div>
      </div>
  </_BaseMemberLayout>
  )
}

export default MyVillage
