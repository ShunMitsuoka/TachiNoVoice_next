import { appConst } from '@/app/const/appConst';
import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import { ColorService } from '@/app/services/colorService';
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
    if (status === "authenticated") {
      axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.my.index), ApiService.getAuthHeader(session))
        .then(function (response) {
          const res = ApiService.makeApiResponse(response);
          if (res.getSuccess()) {
            const result = res.getResult();
            setLists(result);
            console.log(res);
          } else {
            alert('失敗');
          }
        })
        .finally(() => {
          pageLoading.close();
        });
    }
  }, [status]);

  return (
    <_BaseMemberLayout title='ビレッジ'>
      <Head>
        <title>My ビレッジ</title>
      </Head>
      <div className=''>
        <div className='my-12 text-2xl font-bold text-center'>
          参加中ビレッジ一覧
        </div>
        <div className='px-6'>
          {
            lists.map((village, index) => {
              return (
                <Link key={index} href={RouteManager.webRoute.member.village.my.details.index + village.village_id}>
                  <div className=' bg-white rounded-lg shadow-xl mb-10 overflow-hidden'>
                    <div className={' px-2 py-2 ' + ColorService.bgRoleColre(village.role_id)}>
                      <span className='px-2 py-1 bg-white rounded-md text-sm'>
                        {village.role_name}
                      </span>
                      <div className='mt-2 pb-3 text-center font-bold text-lg'>{village.title}</div>
                    </div>
                    <div className='px-3 py-2 text-lg'>
                      <div className=' text-sm'>
                        <span>
                          コアメンバー：{village.core_member_count}
                        </span>
                        <span className='ml-4'>
                          ライズメンバー：{village.rise_member_count}
                        </span>
                      </div>
                      <div className='mt-2 text-base'>
                        ・{village.phase_name}
                      </div>
                    </div>
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
