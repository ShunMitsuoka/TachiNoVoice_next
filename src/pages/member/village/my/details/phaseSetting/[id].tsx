import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { LinkButton } from "@/components/atoms/buttons/linkButton";
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
  start_date?: string,
  end_by_manual_flg: boolean,
  end_by_limit_flg: boolean,
  end_by_date_flg: boolean,
  end_date?: string,
}

const initSetting: Setting = {
  start_by_manual_flg: false,
  start_by_instant_flg: false,
  start_by_date_flg: false,
  start_date: '',
  end_by_manual_flg: false,
  end_by_limit_flg: false,
  end_by_date_flg: false,
  end_date: '',
}

const MyVillagePhaseSetting: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;
  const villageState = useVillage();
  const [setting, SetSetting] = useState<Setting>(initSetting);

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    SetSetting(setting => {
      return { ...setting, [target.name]: value }
    });
  }

  useEffect(() => {
    pageLoading.show();
    if (status === "authenticated") {
      axios.get(ApiService.getFullURL(
        RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.members.list, { 'id': id })
      ), ApiService.getAuthHeader(session))
        .then((response) => {
          const res = ApiService.makeApiResponse(response);
          if (res.getSuccess()) {
            villageState.setVillage(res.getResult());
          } else {
            alert('失敗');
          }
        })
        .finally(() => {
          pageLoading.close();
        });
    }
  }, [status]);

  useEffect(() => {
    let result = initSetting;
    if (villageState.village.is_necessary_to_set_phase_start_setting) {
      result = {
        ...result, ...{
          start_by_manual_flg: villageState.village.phase_start_setting!.by_manual.is_selected,
          start_by_instant_flg: villageState.village.phase_start_setting!.by_instant.is_selected,
          start_by_date_flg: villageState.village.phase_start_setting!.by_date.is_selected,
          start_date: villageState.village.phase_start_setting!.by_date.date,
        }
      }
    }
    if (villageState.village.is_necessary_to_set_phase_end_setting) {
      result = {
        ...result, ...{
          end_by_manual_flg: villageState.village.phase_end_setting!.by_manual.is_selected,
          end_by_limit_flg: villageState.village.phase_end_setting!.by_limit.is_selected,
          end_by_date_flg: villageState.village.phase_end_setting!.by_date.is_selected,
          end_date: villageState.village.phase_end_setting!.by_date.date,
        }
      }
    }
    SetSetting(result);
  }, [villageState.village]);

  const onClickSave = async () => {
    axios.post(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.phase.setting, { 'id': villageState.village.village_id })
    ), setting, ApiService.getAuthHeader(session))
      .then(function (response) {
        const res = ApiService.makeApiResponse(response);
        if (res.getSuccess()) {
          router.replace(RouteManager.webRoute.member.village.my.details.index + villageState.village.village_id.toString())
        } else {
          alert('失敗');
        }
      })
      .catch((error) => {

      })
  }

  return (
    <_BaseMemberLayout title="フェーズ設定">
      <div className="px-6">
        <div className="mt-10 text-center text-2xl font-bold">
          {villageState.village.title}
        </div>
        <div className="mt-6 text-center text-xl">
          {villageState.village.phase_name}
        </div>
        <div className="mt-6">
          {
            villageState.village.is_necessary_to_set_phase_start_setting &&
            <div className=" bg-white rounded-lg shadow-xl overflow-hidden mb-6">
              <div className="py-3 text-xl font-bold mb-2 bg-sub text-white text-center">
                フェーズ開始条件
              </div>
              <div className="px-4 py-4">
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
                    <FormLabel htmlFor={'start_by_instant_flg'} _class='ml-3 text-lg'>
                      {
                        villageState.village.phase_start_setting?.by_instant.label
                      }
                    </FormLabel>
                  </div>
                }
                {
                  villageState.village.phase_start_setting?.by_date.is_need &&
                  <div className='flex items-center mt-4'>
                    <input
                      type={'checkbox'}
                      name="start_by_date_flg"
                      id="start_by_date_flg"
                      checked={setting.start_by_date_flg}
                      onChange={changeInputHandler}
                    />
                    <FormLabel htmlFor={'start_by_date_flg'} _class='ml-3 text-lg'>
                      {
                        villageState.village.phase_start_setting?.by_date.label
                      }
                    </FormLabel>
                  </div>
                }
              </div>
            </div>
          }
          {
            villageState.village.is_necessary_to_set_phase_end_setting &&
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="py-3 text-xl font-bold mb-2 bg-sub text-white text-center">
                フェーズ終了条件
              </div>
              <div className="px-4 py-4">
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
                    <FormLabel htmlFor={'end_by_limit_flg'} _class='ml-3 text-lg'>
                      {
                        villageState.village.phase_end_setting?.by_limit.label
                      }
                    </FormLabel>
                  </div>
                }
                {
                  villageState.village.phase_end_setting?.by_date.is_need &&
                  <div className='flex items-center mt-4'>
                    <input
                      type={'checkbox'}
                      name="end_by_date_flg"
                      id="end_by_date_flg"
                      checked={setting.end_by_date_flg}
                      onChange={changeInputHandler}
                    />
                    <FormLabel htmlFor={'end_by_date_flg'} _class='ml-3 text-lg'>
                      {
                        villageState.village.phase_end_setting?.by_date.label
                      }
                    </FormLabel>
                  </div>
                }
              </div>
            </div>
          }
        </div>
        <div className="flex justify-between mt-6">
          <LinkButton href={RouteManager.webRoute.member.village.my.details.index + villageState.village.village_id}>
            戻る
          </LinkButton>
          <MiddleButton onClick={onClickSave}>
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
