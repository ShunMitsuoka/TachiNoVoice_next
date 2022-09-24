import { appConst } from '@/app/const/appConst'
import { RouteManager } from '@/app/manages/routeManager'
import { AuthService } from '@/app/services/authService'
import { VillageTitle } from '@/components/modules/member/village/villageTitle'
import { PhaseDetailsHeader } from '@/components/templates/member/village/my/details/phaseDetailsHeader'
import { AskingOpinionsOfCoreMember } from '@/components/templates/member/village/my/details/phases/askingOpinionsOfCoreMember'
import { AskingOpinionsOfRiseMember } from '@/components/templates/member/village/my/details/phases/askingOpinionsOfRiseMember'
import { CategorizeOpinions } from '@/components/templates/member/village/my/details/phases/categorizeOpinions'
import { DecidingPolicy } from '@/components/templates/member/village/my/details/phases/decidingPolicy'
import { DrawingCoreMember } from '@/components/templates/member/village/my/details/phases/drawingCoreMember'
import { Evaluation } from '@/components/templates/member/village/my/details/phases/evaluation'
import { RecruitmentOfMember } from '@/components/templates/member/village/my/details/phases/recruitmentOfMember'
import { Satisfaction } from '@/components/templates/member/village/my/details/phases/satisfaction'
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
        component =<RecruitmentOfMember key={1} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case appConst.village.phase.drawingCoreMember:
        component =<DrawingCoreMember key={2} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case appConst.village.phase.askingOpinionsOfCoreMember:
        component =<AskingOpinionsOfCoreMember key={3} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case appConst.village.phase.categorizeOpinions:
        component =<CategorizeOpinions key={4} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case appConst.village.phase.askingOpinionsOfRiseMember:
        component =<AskingOpinionsOfRiseMember key={5} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case appConst.village.phase.evaluation:
        component =<Evaluation key={6} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case appConst.village.phase.decidingPolicy:
        component =<DecidingPolicy key={7} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      case appConst.village.phase.surveyingSatisfaction:
        component =<Satisfaction key={8} phaseNo={phaseNo} village={villageState.village} setVillage={villageState.setVillage}/>
        break;
      default:
        break;
    }
    return component;
  }

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader village={villageState.village} menuType={'phase'} />
      <VillageTitle village={villageState.village} _class='my-8'/>
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
