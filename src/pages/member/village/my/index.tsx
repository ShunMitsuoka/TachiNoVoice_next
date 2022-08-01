import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import { useEffect, useState } from 'react';

type villageType = {
  id : number,
  title : string,
  phase_name : string,
  content : string,
  role_id : number,
}

const MyVillage: NextPage = () => {

  const { data: session, status } = useSession();

  const [lists, setLists] = useState<villageType[]>([]);

  useEffect(() => {
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
    }
  },[status]);

  const getColorClass = (role_id:number) => {
    switch (role_id) {
      case 0:
        return 
        break;
    
      default:
        break;
    }
  }


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
                  <div key={index} className='bg-white rounded-lg drop-shadow-lg'>
                    <div className='px-4 py-6 text-center'>{village.title}</div>
                    <div></div>
                  </div>
                );
              })
            }
          </div>
      </div>
  </_BaseMemberLayout>
  )
}

export default MyVillage
