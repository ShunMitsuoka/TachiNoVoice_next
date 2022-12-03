import { appConst } from '@/app/const/appConst'
import { RouteManager } from '@/app/manages/routeManager'
import { AuthService } from '@/app/services/authService'
import { VillageTitle } from '@/components/modules/member/village/villageTitle'
import { ComponentLoading } from '@/components/templates/common/loading/componentLoading'
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
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyVillageDetails: NextPage = () => {


  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const villageState = useVillage();

  useEffect(() => {
    if(status === "authenticated"){
      villageState.setVillageDetails(id as string);
    }
  },[status]);

  const phaseComponent = (phaseNo : number) :React.ReactNode => {
    let component = null;
    if(!villageState.isInitializedVillage()){
      return component;
    }
    switch (phaseNo) {
      case appConst.village.phase.recruitmentOfMember:
        component =<RecruitmentOfMember key={1} phaseNo={phaseNo} village={villageState.village!} setVillageDetails={villageState.setVillageDetails}/>
        break;
      case appConst.village.phase.drawingCoreMember:
        component =<DrawingCoreMember key={2} phaseNo={phaseNo} village={villageState.village!} />
        break;
      case appConst.village.phase.askingOpinionsOfCoreMember:
        component =<AskingOpinionsOfCoreMember key={3} phaseNo={phaseNo} village={villageState.village!} setVillageDetails={villageState.setVillageDetails}/>
        break;
      case appConst.village.phase.categorizeOpinions:
        component =<CategorizeOpinions key={4} phaseNo={phaseNo} village={villageState.village!}/>
        break;
      case appConst.village.phase.askingOpinionsOfRiseMember:
        component =<AskingOpinionsOfRiseMember key={5} phaseNo={phaseNo} village={villageState.village!} setVillageDetails={villageState.setVillageDetails}/>
        break;
      case appConst.village.phase.evaluation:
        component =<Evaluation key={6} phaseNo={phaseNo} village={villageState.village!} setVillageDetails={villageState.setVillageDetails}/>
        break;
      case appConst.village.phase.decidingPolicy:
        component =<DecidingPolicy key={7} phaseNo={phaseNo} village={villageState.village!} setVillageDetails={villageState.setVillageDetails}/>
        break;
      case appConst.village.phase.surveyingSatisfaction:
        component =<Satisfaction key={8} phaseNo={phaseNo} village={villageState.village!} setVillageDetails={villageState.setVillageDetails}/>
        break;
      default:
        break;
    }
    return component;
  }

  return (
    <_BaseMemberLayout>
      <ComponentLoading isShow={!villageState.isInitializedVillage()} loadingText='ビレッジ情報を読み込んでいます' />
      {
        villageState.villageComponent(
          <>
            <PhaseDetailsHeader village={villageState.village!} menuType={'phase'} />
            <VillageTitle village={villageState.village!} _class=''/>
            <div className='flex flex-col gap-6 px-6 mt-5'>
              {
                [1,2,3,4,5,6,7,8].map((phase) => {
                  return phaseComponent(phase);
                })
      
              }
            </div>
          </>
        )
      }
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
