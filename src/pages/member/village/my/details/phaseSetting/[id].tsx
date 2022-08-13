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

type setting = {
  phase_start_setting : {
      by_manual_flg:boolean,
      by_instant_flg:boolean,
      by_date_flg:boolean,
  }
  phase_end_setting : {
      by_manual_flg:boolean,
      by_limit_flg:boolean,
      by_date_flg:boolean,
  }
}

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
          {
            villageState.village.is_necessary_to_set_phase_start_setting &&
            <div>
              <div>フェーズ開始条件</div>
            </div>
          }
          {
            villageState.village.is_necessary_to_set_phase_end_setting &&
            <div>
              <div>フェーズ終了条件</div>
              <div className='flex items-center'>
                  <input 
                      type={'radio'} 
                      name="end.by_limit_flg" 
                      id="end.by_limit_flg" 
                      checked={formData.end.by_limit_flg}
                      onChange={changeInputHandler}
                  /> 
                  <FormLabel htmlFor={'end.by_limit_flg'} _class='ml-3'>定員になり次第終了</FormLabel>
              </div>
            </div>
          }
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
