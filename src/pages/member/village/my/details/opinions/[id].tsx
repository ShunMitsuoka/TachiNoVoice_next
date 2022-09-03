import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { LinkButton } from "@/components/atoms/buttons/linkButton";
import { MiddleButton } from "@/components/atoms/buttons/middleButton";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { OpinionCard } from "@/components/templates/member/village/my/details/opinions/opinionCard";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { usePhaseComponent } from "@/hooks/components/member/village/my/usePhaseComponent";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import { useVillageMethod } from "@/hooks/components/member/village/my/useVillageMethod";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MemberDetails } from "villageType";

const MyVillageOpinios: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();
  const villageState = useVillage();
  const [members, setMembers] = useState<MemberDetails[]>([]);
  const villageMethod = useVillageMethod(villageState.village, villageState.setVillage);
  const phaseComponet = usePhaseComponent(villageState.village);


  useEffect(() => {
    if (status === "authenticated") {
      pageLoading.show();
      axios.get(ApiService.getFullURL(
        RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.index, { 'id': id })
      ), ApiService.getAuthHeader(session))
        .then((response) => {
          const res = ApiService.makeApiResponse(response);
          console.log(res);
          if (res.getSuccess()) {
            villageState.setVillage(res.getResult());
            let memberDetails: MemberDetails[] = [];
            response.data.result.members.core_members.map((memberDetail: MemberDetails) => {
              memberDetails.push(memberDetail);
            });
            response.data.result.members.rise_members.map((memberDetail: MemberDetails) => {
              memberDetails.push(memberDetail);
            });
            setMembers(memberDetails);
          } else {
            alert('失敗');
          }
        })
        .finally(pageLoading.close);
    }
  }, [status]);

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader village={villageState.village} menuType={"opinion"} />
      <VillageTitle village={villageState.village} _class='my-8'/>
      <div className="mt-4 text-center">
        {phaseComponet.phaseComponent({
          askingOpinionsOfCoreMember: {
            host: (
              <MiddleButton onClick={villageMethod.nextPhase}>
                意見募集終了
              </MiddleButton>
            )
          },
          categorizeOpinions: {
            host: (
              <LinkButton href={RouteManager.webRoute.member.village.my.details.category.make + villageState.village.village_id}>
                カテゴリー作成
              </LinkButton>
            )
          }
        })}
      </div>
      <div className="px-4 mt-6">
        {
          members.map((member) => {
            return (
              member.opinions &&
              member.opinions.map((opinion, index) => {
                return (
                  opinion &&
                  <div key={index} className="mt-4">
                    <OpinionCard name={member.nickname} opinion={opinion} gender={member.gender} age={member.age} />
                  </div>
                )
              })
            );
          })
        }
      </div>
    </_BaseMemberLayout>
  )
}

export default MyVillageOpinios;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
