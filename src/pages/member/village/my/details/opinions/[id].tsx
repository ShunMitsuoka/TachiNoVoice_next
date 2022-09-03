import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
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
          let memberDetails:MemberDetails[] = [];
          response.data.result.members.core_members.map((memberDetail : MemberDetails) => {
            memberDetails.push(memberDetail);
          });
          response.data.result.members.rise_members.map((memberDetail : MemberDetails) => {
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
      <PhaseDetailsHeader village={villageState.village} />
      <div>
        {
          members.map((member) => {
            return (
              <div key={member.user_id}>
                <div>{member.nickname}</div>
                <div>
                    {
                      member.opinions && 
                      member.opinions.map((opinion, index) => {
                        return (
                          <div key={index}>{opinion}</div>
                        )
                      })
                    }
                </div>
              </div>
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
