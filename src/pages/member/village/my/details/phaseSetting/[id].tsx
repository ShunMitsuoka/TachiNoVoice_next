import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { MiddleButton } from "@/components/atoms/buttons/middleButton";
import { FormLabel } from "@/components/atoms/label/formLabel";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Setting = {
  start_by_manual_flg: boolean,
  start_by_instant_flg: boolean,
  start_by_date_flg: boolean,
  start_date: string,
  end_by_manual_flg: boolean,
  end_by_limit_flg: boolean,
  end_by_date_flg: boolean,
  end_date: string,
}

const MyVillagePhaseSetting: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;

  const villageState = useVillage();

  const [setting, SetSetting] = useState<Setting>({
    start_by_manual_flg: false,
    start_by_instant_flg: false,
    start_by_date_flg: false,
    start_date: '',
    end_by_manual_flg: false,
    end_by_limit_flg: false,
    end_by_date_flg: false,
    end_date: '',
  });

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    SetSetting(setting => {
        return { ...setting, [target.name]: value }
  });
}

  useEffect(() => {
    if (status === "authenticated") {
      axios.get(ApiService.getFullURL(
        RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.members.list, { 'id': id })
      ), ApiService.getAuthHeader(session))
        .then((response) => {
          const res = ApiService.makeApiResponse(response);
          if (res.getSuccess()) {
            villageState.setVillage(res.getResult());
            let result = {};
            if(villageState.village.exists_phase_start_setting){
              result = {...result, ...{

              }}
            }

            // SetSetting({
            //   // start_by_manual_flg: villageState.village.phase_start_setting.,
            //   start_by_instant_flg: false,
            //   start_by_date_flg: false,
            //   start_date: '',
            //   end_by_manual_flg: false,
            //   end_by_limit_flg: false,
            //   end_by_date_flg: false,
            //   end_date: '',
            // });
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
        <div className="px-10">
          {
            villageState.village.is_necessary_to_set_phase_start_setting &&
            <div>
              <div>フェーズ開始条件</div>
              {
                villageState.village.phase_start_setting?.by_instant.is_need &&
                <div className='flex items-center'>
                  <input
                    type={'checkbox'}
                    name="start_by_instant_flg"
                    id="start_by_instant_flg"
                    checked={setting.start_by_instant_flg}
                    onChange={changeInputHandler}
                  />
                  <FormLabel htmlFor={'start_by_instant_flg'} _class='ml-3'>
                    {
                      villageState.village.phase_start_setting?.by_instant.label
                    }
                  </FormLabel>
                </div>
              }
              {
                villageState.village.phase_start_setting?.by_date.is_need &&
                <div className='flex items-center mt-2'>
                  <input
                    type={'checkbox'}
                    name="start_by_date_flg"
                    id="start_by_date_flg"
                    checked={setting.start_by_date_flg}
                    onChange={changeInputHandler}
                  />
                  <FormLabel htmlFor={'start_by_date_flg'} _class='ml-3'>
                    {
                      villageState.village.phase_start_setting?.by_date.label
                    }
                  </FormLabel>
                </div>
              }
            </div>
          }
          {
            villageState.village.is_necessary_to_set_phase_end_setting &&
            <div>
              <div className="text-xl font-bold mb-2">
                フェーズ終了条件
              </div>
              {
                villageState.village.phase_end_setting?.by_limit.is_need &&
                <div className='flex items-center'>
                  <input
                    type={'checkbox'}
                    name="end_by_limit_flg"
                    id="end_by_limit_flg"
                    checked={setting.end_by_limit_flg}
                    onChange={changeInputHandler}
                  />
                  <FormLabel htmlFor={'end_by_limit_flg'} _class='ml-3'>
                    {
                      villageState.village.phase_end_setting?.by_limit.label
                    }
                  </FormLabel>
                </div>
              }
              {
                villageState.village.phase_end_setting?.by_date.is_need &&
                <div className='flex items-center mt-2'>
                  <input
                    type={'checkbox'}
                    name="end_by_date_flg"
                    id="end_by_date_flg"
                    checked={setting.end_by_date_flg}
                    onChange={changeInputHandler}
                  />
                  <FormLabel htmlFor={'end_by_date_flg'} _class='ml-3'>
                    {
                      villageState.village.phase_end_setting?.by_date.label
                    }
                  </FormLabel>
                </div>
              }
            </div>
          }
        </div>
        <div className="text-center mt-4">
          <MiddleButton onClick={villageState.nextPhase}>
            設定保存
          </MiddleButton>
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
