import { RouteManager } from '@/app/manages/routeManager'
import { ApiService } from '@/app/services/apiService'
import { AuthService } from '@/app/services/authService'
import { PhaseComponent } from '@/components/templates/member/village/my/details/phaseComponent'
import { Phase1 } from '@/components/templates/member/village/my/details/phases/phase1'
import { usePageLoading } from '@/hooks/common/usePageLoading'
import _BaseLayout from '@/layouts/_baseLayout'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export type myVillageType = {
  village_id : number,
  title : string,
  phase : number,
  phase_name : string,
  content : string,
  role_id : number,
  village_member_limit : number,
  village_member_count : number,
  is_phase_preparing : boolean,
}

const MyVillageDetails: NextPage = () => {


  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;

  const [village, setVillageData] = useState<myVillageType>({
    village_id : 0,
    title : '',
    phase : 0,
    phase_name : '',
    content : '',
    role_id : 0,
    village_member_limit : 0,
    village_member_count : 0,
    is_phase_preparing : false,
  });


  useEffect(() => {
    if(status === "authenticated"){
      axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.my.details)+id, ApiService.getAuthHeader(session))
      .then(function (response) {
          const res = ApiService.makeApiResponse(response);
          if(res.getSuccess()){
            console.log(res);
            setVillageData(res.getResult());
          }else{
              alert('失敗');
          }
      })
    }
  },[status]);

  const phaseComponent = (phase : number) :React.ReactNode => {
    let component = null;
    switch (phase) {
      case 1:
        component =<Phase1 key={1} phaseId={phase} village={village}/>
        break;
      case 2:
        component =<Phase1 key={2} phaseId={phase} village={village}/>
        break;
      case 3:
        component =<Phase1 key={3} phaseId={phase} village={village}/>
        break;
      case 4:
        component =<Phase1 key={4} phaseId={phase} village={village}/>
        break;
      case 5:
        component =<Phase1 key={5} phaseId={phase} village={village}/>
        break;
      case 6:
        component =<Phase1 key={6} phaseId={phase} village={village}/>
        break;
      case 7:
        component =<Phase1 key={7} phaseId={phase} village={village}/>
        break;
      case 8:
        component =<Phase1 key={8} phaseId={phase} village={village}/>
        break;
    
      default:
        break;
    }
    return component;
  }

  return (
    <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding}>
      <div className='my-8 text-center text-xl font-bold'>
        {village.title}
      </div>
      <div className='flex flex-col gap-6 px-6'>
        {
          [1,2,3,4,5,6,7,8].map((phase) => {
            return phaseComponent(phase);
          })

        }
      </div>
    </_BaseMemberLayout>
  )
}

export default MyVillageDetails

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
      return { props: {} }
  }
  return AuthService.authFailed();
}
