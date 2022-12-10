import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { MiddleButton } from "@/components/atoms/buttons/middleButton";
import { FormLabel } from "@/components/atoms/label/formLabel";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { VillageMemberCard } from '@/components/modules/member/village/villageMemberCard'
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePhaseComponent } from "@/hooks/components/member/village/my/usePhaseComponent";
import { useVillageMethod } from "@/hooks/components/member/village/my/useVillageMethod";
import { appConst } from "@/app/const/appConst";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { ComponentLoading } from "@/components/templates/common/loading/componentLoading";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";


export type memberType = {
  member_id: "",
  nickname: string,
  age: string,
  gender: string,
  gender_name: string,
}

const AgeGraph = dynamic(() => import("./ageGraph"), { ssr: false });
const GenderGraph = dynamic(() => import("./genderGraph"), { ssr: false });

const MyVillageMembers: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();

  const villageState = useVillage();
  const phaseComponet = usePhaseComponent(villageState.village);
  const villageMethod = useVillageMethod(villageState.village, villageState.setVillageDetails);

  const [villageMembers, setVillageMembers] = useState<memberType[]>([]);
  const [coreMembers, setCoreMembers] = useState<memberType[]>([]);
  const [riseMembers, setRiseMembers] = useState<memberType[]>([]);
  const [memberData, setMemberData] = useState<memberType[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      reloadMembers();
    }
  }, [status]);

  const reloadMembers = () => {
    axios.get(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.members.list, { 'id': id })
    ), ApiService.getAuthHeader(session))
    .then((response) => {
      const res = ApiService.makeApiResponse(response);
      if (res.getSuccess()) {
        console.log(res.getResult());
        villageState.setVillage(res.getResult());
        setVillageMembers(response.data.result.members.village_members);
        setCoreMembers(response.data.result.members.core_members);
        setRiseMembers(response.data.result.members.rise_members);
        setMemberData([].concat(response.data.result.members.village_members, response.data.result.members.core_members, response.data.result.members.rise_members));
      } else {
        alert('失敗');
      }
    })
    .finally();
  }

  useEffect(() => {
    console.log(memberData);
  }, [memberData]);

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader villageId={Number(id)} menuType={"member"} />
      <ComponentLoading isShow={!villageState.isInitializedVillage()} loadingText='ビレッジ情報を読み込んでいます' />
      {
        villageState.villageComponent(
          <>
            <VillageTitle village={villageState.village!} _class=''/>
            <>
              {phaseComponet.phaseComponent({
                recruitmentOfMember : {
                  other : (
                    <>
                      <div className='mt-3 flex justify-center'>
                        <FormLabel htmlFor={'coremember'}>ビレッジメンバー</FormLabel>
                      </div>
                      <div className='mt-3 flex justify-center'>
                        <FormLabel htmlFor={'coremember'}>{villageState.village?.village_member_count}/{villageState.village?.village_member_limit}</FormLabel>
                      </div>
                    </>
                  )
                },
                drawingCoreMember : {
                  other : (
                    <>
                      <div className='mt-3 flex justify-center'>
                        <FormLabel htmlFor={'coremember'}>ビレッジメンバー</FormLabel>
                      </div>
                      <div className='mt-3 flex justify-center'>
                        <FormLabel htmlFor={'coremember'}>{villageState.village?.village_member_count}/{villageState.village?.village_member_limit}</FormLabel>
                      </div>
                    </>
                  )
                },
                other : {
                  other : (
                    <>
                      <div className='mt-3 flex justify-center'>
                        <FormLabel htmlFor={'coremember'}>コアメンバー</FormLabel>
                      </div>
                      <div className='mt-3 flex justify-center'>
                        <FormLabel htmlFor={'coremember'}>{villageState.village?.core_member_count}/{villageState.village?.core_member_limit}</FormLabel>
                      </div>
                    </>
                  )
                }
              })}
            </>
            <div>
              <div className='mt-3 flex justify-center'>
                {phaseComponet.phaseComponent({
                  recruitmentOfMember : {
                    host : (
                      <MiddleButton onClick={villageMethod.nextPhase}>
                        募集を締め切る
                      </MiddleButton>
                    )
                  },
                  drawingCoreMember : {
                    host : (
                      <MiddleButton onClick={() => {
                        villageMethod.startPhase(reloadMembers);
                      }}>
                        抽選を行う
                      </MiddleButton>
                    )
                  }
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 mt-4">
                <div className="relative col-span-1 flex flex-col items-center">
                  <div>
                    年齢
                  </div>
                  <div className="relative w-28 h-32">
                    <AgeGraph data={memberData} />
                  </div>
                </div>
                <div className="relative col-span-1 flex flex-col items-center">
                  <div>
                    性別
                  </div>
                  <div className="relative w-28 h-32">
                    <GenderGraph data={memberData}/>
                  </div>
                </div>
            </div>
            {
              villageMembers.length > 0 && (
                <div className="px-6">
                  <div className="font-bold">ビレッジメンバー</div>
                  <div className='grid grid-cols-12 gap-4 mt-2'>
                      {
                          villageMembers.map((elem, index) => {
                              return <VillageMemberCard key={index} name={elem.nickname} age={elem.age} gender={elem.gender_name} id={elem.member_id} role_id={appConst.member.role.villageMember} />
                          })
                      }
                  </div>
                </div>
              )
            }
            {
              coreMembers.length > 0 && (
                <div className="px-6">
                  <div className="font-bold">コアメンバー</div>
                  <div className='grid grid-cols-12 gap-4 mt-2'>
                      {
                          coreMembers.map((elem, index) => {
                              return <VillageMemberCard key={index} name={elem.nickname} age={elem.age} gender={elem.gender_name} id={elem.member_id} role_id={appConst.member.role.coreMember} />
                          })
                      }
                  </div>
                </div>
              )
            }
            {
              riseMembers.length > 0 && (
                <div className="px-6 mt-4">
                  <div className="font-bold">ライズメンバー</div>
                  <div className='grid grid-cols-12 gap-4 mt-2'>
                      {
                          riseMembers.map((elem, index) => {
                              return <VillageMemberCard key={index} name={elem.nickname} age={elem.age} gender={elem.gender_name} id={elem.member_id} role_id={appConst.member.role.riseMember} />
                          })
                      }
                  </div>
                </div>
              )
            }
          </>
        )
      }
    </_BaseMemberLayout>
  )
}

export default MyVillageMembers

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
