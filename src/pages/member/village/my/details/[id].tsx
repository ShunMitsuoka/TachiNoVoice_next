import { appConst } from '@/app/const/appConst'
import { RouteManager } from '@/app/manages/routeManager'
import { AuthService } from '@/app/services/authService'
import { PhaseDetailsHeader } from '@/components/templates/member/village/my/details/phaseDetailsHeader'
import { AskingOpinionsOfCoreMember } from '@/components/templates/member/village/my/details/phases/askingOpinionsOfCoreMember'
import { DrawingCoreMember } from '@/components/templates/member/village/my/details/phases/drawingCoreMember'
import { Phase1 } from '@/components/templates/member/village/my/details/phases/phase1'
import { useVillage } from '@/hooks/components/member/village/my/useVillage'
import { useVillageMethod } from '@/hooks/components/member/village/my/useVillageMethod'
import _BaseLayout from '@/layouts/_baseLayout'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyVillageDetails: NextPage = () => {


  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const villageState = useVillage();
  const villageMethod = useVillageMethod(villageState.village, villageState.setVillage);

  useEffect(() => {
    if(status === "authenticated"){
      villageMethod.setVillageDetails(id as string);
    }
  },[status]);

  const phaseComponent = (phaseNo : number) :React.ReactNode => {
    let component = null;
    switch (phaseNo) {
      case appConst.village.phase.recruitmentOfMember:
        component =<Phase1 key={1} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case appConst.village.phase.drawingCoreMember:
        component =<DrawingCoreMember key={2} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case 3:
        component =<AskingOpinionsOfCoreMember key={3} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case 4:
        component =<Phase1 key={4} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case 5:
        component =<Phase1 key={5} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case 6:
        component =<Phase1 key={6} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case 7:
        component =<Phase1 key={7} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case 8:
        component =<Phase1 key={8} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
    
      default:
        break;
    }
    return component;
  }

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader village={villageState.village} />
      <div className='my-8 text-center text-xl font-bold'>
        {villageState.village.title}
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
