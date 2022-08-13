import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { MiddleButton } from "@/components/atoms/buttons/middleButton";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyVillagePhaseSetting: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;

  const villageState = useVillage();

  useEffect(() => {
    if (status === "authenticated") {
      axios.get(ApiService.getFullURL(
        RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.members.list, { 'id': id })
      ), ApiService.getAuthHeader(session))
      .then((response) => {
        const res = ApiService.makeApiResponse(response);
        if (res.getSuccess()) {
          villageState.setVillage(res.getResult());
          console.log(res);
        } else {
          alert('失敗');
        }
      });
    }
  }, [status]);

  return (
    <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding}>
      <div>
        フェーズ設定
        <div>
          {villageState.phaseComponent({
            recruitmentOfMember : {
              host : (
                <MiddleButton onClick={villageState.nextPhase}>
                  募集を締め切る
                </MiddleButton>
              )
            },
            drawingCoreMember : {
              host : (
                <MiddleButton onClick={villageState.startPhase}>
                  抽選を行う
                </MiddleButton>
              )
            }
          })}
        </div>
      </div>
    </_BaseMemberLayout>
  )
}

export default MyVillagePhaseSetting

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
