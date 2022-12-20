import { RouteManager } from '@/app/manages/routeManager'
import { ApiService } from '@/app/services/apiService'
import { AuthService } from '@/app/services/authService'
import { BaseButton } from '@/components/atoms/buttons/baseButton'
import { LinkButton } from '@/components/atoms/buttons/linkButton'
import { FormLabel } from '@/components/atoms/label/formLabel'
import { ComponentLoading } from '@/components/templates/common/loading/componentLoading'
import { usePageLoading } from '@/hooks/common/usePageLoading'
import { useSweetAlert } from '@/hooks/common/useSweetalert'
import { useVillage } from '@/hooks/components/member/village/my/useVillage'
import _BaseLayout from '@/layouts/_baseLayout'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'

const Details: NextPage = () => {

  const sweet = useSweetAlert();

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();

  const router = useRouter();
  const { id } = router.query;

  const villageState = useVillage();

  useEffect(() => {
    if (status === "authenticated") {
      pageLoading.show();
      axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource) + "/" + id, ApiService.getAuthHeader(session))
        .then(async function (response) {
          const res = ApiService.makeApiResponse(response);
          if (res.getSuccess()) {
            console.log(res);
            const result = res.getResult();
            villageState.setVillage(result);
          } else {
            await sweet.error("ビレッジ情報の取得に失敗しました", "");
          }
        }).catch(async (error) => {
          await sweet.error("ビレッジ情報の取得に失敗しました", "");
        }).finally(() => {
          pageLoading.close();
        })
    }
  }, [status]);

  const onClickEntry = async () => {
    const params = {
      village_id: villageState.village!.village_id
    };
    // console.log(villageData.id);
    pageLoading.show();
    await ApiService.getCSRF();
    axios.post(ApiService.getFullURL(RouteManager.apiRoute.member.village.join), params, ApiService.getAuthHeader(session))
      .then(async function (response) {
        const res = ApiService.makeApiResponse(response);
        if (res.getSuccess()) {
          await sweet.success("「" + villageState.village!.title + "」に参加しました。", "OKをタッチしてください");
          router.replace(RouteManager.webRoute.member.village.my.details.index + villageState.village!.village_id);
        } else {
          await sweet.error("ビレッジの参加に失敗しました", "");
        }
      })
      .catch(async (error) => {
        await sweet.error("ビレッジの参加に失敗しました", "");
      }).finally(() => {
        pageLoading.close();
      })
  }

  const contents = () => {
    let contents = [];
    if (villageState.village?.phase_end_setting?.by_manual.is_selected) {
      contents.push(
        <div key={1}>
          {villageState.village?.phase_end_setting?.by_manual.label}
        </div>);
    }
    if (villageState.village?.phase_end_setting?.by_limit.is_selected) {
      contents.push(<div key={2}>{
        villageState.village?.phase_end_setting?.by_limit.label
      }</div>);
    }
    if (villageState.village?.phase_end_setting?.by_date.is_selected) {
      contents.push(<div key={3}>{
        villageState.village?.phase_end_setting?.by_date.label
      }</div>);
    }
    return contents;
  }

  return (
    <_BaseMemberLayout>
      <div className="absolute top-2 right-2">
          <Image
              src={'/images/common/decoration/tr-deco.svg'}
              width={300}
              height={130}
          />
      </div>
      <div className='relative px-6 pt-20 pb-10'>
        <ComponentLoading isShow={!villageState.isInitializedVillage()} loadingText='ビレッジ情報を読み込んでいます' />
        {
          villageState.villageComponent(
            <>
              <div>
                <div className=' inline-block px-2 py-1 text-white rounded-t bg-sub'>ビレッジタイトル</div>
                <div className=' px-3 py-2 bg-white rounded-b rounded-tr shadow-lg font-bold text-lg'>
                  {villageState.village?.title}
                </div>
              </div>
              <div className='mt-6'>
                <div className=' inline-block px-2 py-1 text-white rounded-t bg-sub'>ビレッジ詳細</div>
                <div className='grid grid-cols-12 py-2 px-2 bg-slate-100 rounded-tr'>
                  <div className='col-span-3'>内容</div>
                  <div className=' col-span-9'>
                    {villageState.village?.content}
                  </div>
                </div>
                <div className='grid grid-cols-12 py-2 px-2 bg-white'>
                  <div className=' col-span-3'>注意事項</div>
                  <div className=' col-span-9'>
                    {villageState.village?.note}
                  </div>
                </div>
                <div className='grid grid-cols-12 py-2 px-2 bg-slate-100'>
                  <div className=' col-span-3'>参加条件</div>
                  <div className=' col-span-9'>
                    {villageState.village?.requirement}
                  </div>
                </div>
                <div className='grid grid-cols-12 py-2 px-2 bg-white rounded-b'>
                  <div className='col-span-3'>募集情報</div>
                  <div className='col-span-9'>
                    { contents() }
                  </div>
                </div>
              </div>

              <div className='flex justify-between mt-4'>
                <LinkButton href={RouteManager.webRoute.member.village.search.index}>
                  戻る
                </LinkButton>
                <BaseButton onClick={onClickEntry}>
                  参加する
                </BaseButton>
              </div>
            </>
          )
        }
      </div>
    </_BaseMemberLayout >
  )
}

export default Details

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
