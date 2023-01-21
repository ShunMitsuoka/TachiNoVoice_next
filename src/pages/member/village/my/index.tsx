import { appConst } from '@/app/const/appConst';
import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import { ColorService } from '@/app/services/colorService';
import { SectionTitle } from '@/components/modules/common/section/sectionTitle';
import { VillageListHeader } from '@/components/templates/member/village/dashboard/villageListHeader';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Village } from 'villageType';

const MyVillage: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const [lists, setLists] = useState<Village[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    pageLoading.show();
    if (status === "authenticated") {

      const params = {
        recordNum: 2,
        finishedFlg: isFinished,
      };
      const config = ApiService.getAuthHeader(session);
      const setconfig = ApiService.setConfig('params', params, config);
      axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.my.index), setconfig)
        .then(function (response) {
          const res = ApiService.makeApiResponse(response);
          if (res.getSuccess()) {
            const result = res.getResult();
            setLists(result.data);
            console.log(res);
          } else {
            alert('失敗');
          }
        })
        .finally(() => {
          pageLoading.close();
        });
    }
  }, [status, isFinished]);

  const changeList = (flg : boolean) => {
    setIsFinished(flg)
  }

  return (
    <_BaseMemberLayout title='ビレッジ'>
      <Head>
        <title>My ビレッジ</title>
      </Head>
      <VillageListHeader onClick={changeList} showFinishedVillage={isFinished} />
      <div className='px-6 pt-8'>
        {
          lists.map((village, index) => {
            return (
              <Link key={index} href={RouteManager.webRoute.member.village.my.details.index + village.village_id}>
                <div key={index} className='relative px-3 py-3 bg-white rounded-lg shadow-lg mb-4'>
                  <div className="grid grid-cols-12 gap-3 pb-2 border-b border-gray-400">
                      <div className=" col-span-4">
                          <Image src={'/images/member/village/village.png'} width={30} height={17} layout={'responsive'}/>
                      </div>
                      <div className=" col-span-8">
                          <div className={' inline-block rounded-full px-1 text-white text-sm ' + ColorService.bgRoleColre(village.role_id)}>{village.role_name}</div>
                          <div className=" font-bold mt-1">
                              {village.title}
                          </div>
                      </div>
                  </div>
                  <div className='mt-2 text-sm'>
                      <span>
                        コアメンバー：{village.core_member_count}
                      </span>
                      <span className='ml-4'>
                        ライズメンバー：{village.rise_member_count}
                      </span>
                  </div>
                  <div className="mt-2">
                      ・{village.phase_name}
                  </div>
              </div>
              </Link>
            );
          })
        }
      </div>
    </_BaseMemberLayout>
  )
}

export default MyVillage
