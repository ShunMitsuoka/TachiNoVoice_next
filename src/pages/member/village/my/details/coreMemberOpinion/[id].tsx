import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { BaseButton } from "@/components/atoms/buttons/baseButton";
import { LinkButton } from "@/components/atoms/buttons/linkButton";
import { BaseTextArea } from "@/components/atoms/textarea/baseTextArea";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { ComponentLoading } from "@/components/templates/common/loading/componentLoading";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import nl2br from "react-nl2br";



const CoreMemberOpinion: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;
  const [opinion, setOpinion] = useState("");
  const [now, setNow] = useState<Number>();
  const [iken, setIken] = useState(true);

  const onClickNextiken = () => {
    setNow(1);
    if (opinion === '') {
      setIken(false);
    }
  }
  const onClickBack = () => {
    setNow(2);
  }
  const onClickdefault = () => {
    setNow(0);
  }
  const villageState = useVillage();
  useEffect(() => {
    if (status === 'authenticated') {
      villageState.setVillageDetails(id as string);
    }
  }, [status]);

  useEffect(() => {
    if(villageState.village && villageState.village.is_task_done){
      router.replace(RouteManager.webRoute.member.village.my.details.index + id);
    }
  }, [villageState.village]);

  const postOpinion = () => {
    pageLoading.show()
    axios.post(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.coreMember, { 'id': villageState.village?.village_id })
    ), {
      opinion: opinion
    }, ApiService.getAuthHeader(session))
    .then((response) => {
      const res = ApiService.makeApiResponse(response);
      if (res.getSuccess()) {
        setNow(2);
      } else {
        alert('失敗')
      }
    })
    .finally(pageLoading.close);
  }

  const content = () => {
    switch (now) {
      case 1:
        if (iken) {
          return (
            <>
              <div className='text-center text-sub text-xl'>
                以下の意見で問題ありませんか？
              </div>
              <div className='text-sub text-xl mt-6'>
                <div>【ご意見】</div>
                {nl2br(opinion)}
              </div>
              <div className="flex justify-between mt-6">
                <BaseButton onClick={onClickdefault}>
                  戻る
                </BaseButton>
                <BaseButton onClick={postOpinion}>
                意見する
                </BaseButton>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div className='text-center text-sub text-2xl'>意見を入力してください</div>
              <div className='flex justify-between'>
                <button className='mt-10 font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'
                  onClick={onClickdefault}
                >
                  戻る
                </button>
              </div>
            </>
          );
        }
      case 2:
        return (
          <>
            <div className='text-xl text-center text-sub'>
                <p>
                  ご意見ありがとうございます。<br />
                  評価フェーズまで<br />
                  しばらくお待ちください。
                </p>
              <div className='flex justify-center mt-6'>
                <LinkButton href={RouteManager.webRoute.member.village.my.details.index + villageState.village?.village_id}>
                  戻る
                </LinkButton>
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className='text-center text-sub text-xl'>
              本議題について意見してください
            </div>
            <div className='mt-6'>
              <BaseTextArea 
                rows={10}
                placeholder="意見を入力してください"
                onChange={(event) => {
                  setOpinion(event.target.value)
                  setIken(true);
                }}
                value={opinion}
              />
            </div>
            <div className='flex justify-between mt-6'>
              <BaseButton onClick={onClickBack}>
                戻る
              </BaseButton>
              <BaseButton onClick={onClickNextiken}>
                確定
              </BaseButton>
            </div>
          </>
        );
        break;
    }
  }

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader villageId={Number(id)} menuType={'opinion'} />
      <ComponentLoading isShow={!villageState.isInitializedVillage()} loadingText='ビレッジ情報を読み込んでいます' />
      {
        villageState.villageComponent(
          <>
            <VillageTitle village={villageState.village!} showContent={true}/>
            <div className="px-8 py-8">
              {content()}
            </div>
          </>
        )
      }
    </_BaseMemberLayout>
  )
}
export default CoreMemberOpinion

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
