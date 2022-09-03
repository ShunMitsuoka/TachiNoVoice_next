import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { FormLabel } from "@/components/atoms/label/formLabel";
import { SetVillageStartRequirement } from "@/components/templates/member/village/register/setting/setVillageStartRequirement";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaBreadSlice } from "react-icons/fa";



const CoreMemberOpinion: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;
  const [opinion, setOpinion] = useState("");
  const [now, setNow] = useState<Number>();
  const [iken, setIken] = useState(true);


  const onClickNext = () => {
    console.log('opinion : ' + opinion);
    console.log('Next');
    setNow(1);
  }
  const onClickNextiken = () => {
    setNow(1);
    if (opinion === '') {
      setIken(false);
    }
  }
  const onClickBack = () => {
    console.log('Back');
    setNow(2);
  }
  const onClickdefault = () => {
    console.log('default');
    setNow(0);
  }
  const villageState = useVillage();
  useEffect(() => {
    if (status === 'authenticated') {
      pageLoading.show();
      axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource) + "/" + id, ApiService.getAuthHeader(session))
        .then(function (response) {
          const res = ApiService.makeApiResponse(response);
          if (res.getSuccess()) {
            console.log(res);
            const result = res.getResult();
            villageState.setVillage(result);
          } else {
            alert('失敗');
          }
        }).catch((error) => {
          alert('');
          const res = ApiService.makeApiResponse(error.response);
        }).finally(() => {
          pageLoading.close();
        })
    }
  }, [status]);

  const postOpinion = () => {
    axios.post(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.coreMember, { 'id': villageState.village.village_id })
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
      });
  }

  switch (now) {
    case 1:

      if (iken) {
        return (
          <_BaseMemberLayout>
            <div className='text-center text-sub text-2xl'>以下の意見で問題ありませんか？</div>
            <div className='text-center text-sub text-2xl'>{villageState.village.title}</div>
            <div className='text-center text-sub text-2xl'>{villageState.village.content}</div>
            <div className='text-center text-sub text-4xl mt-10'>{opinion}</div>
            <div className="flex justify-between">

              <button className='mt-10 font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'
                onClick={onClickdefault}
              >
                戻る
              </button>
              <button className='mt-10 font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'
                onClick={postOpinion}>意見する</button>
            </div>
          </_BaseMemberLayout>
        );
      } else {
        return (
          <_BaseMemberLayout>
            <div className='text-center text-sub text-2xl'>意見を入力してください</div>
            <div className='flex justify-between'>
              <button className='mt-10 font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'
                onClick={onClickdefault}
              >
                戻る
              </button>
            </div>
          </_BaseMemberLayout>
        )

      }
      break;
    case 2:
      return (
        <_BaseMemberLayout>
          <div className='text-2xl text-center text-sub mt-10'>ご意見ありがとうございます。<br />評価フェーズまで<br />しばらくお待ちください。</div>
          <div className='flex justify-center'>
            {/* //<Link href={RouteManager.webRoute.member.village.my.details.index + village.village_id}></Link> */}
            <Link href={RouteManager.webRoute.member.village.my.details.index + villageState.village.village_id}
              className='font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'>戻る</Link>
          </div>
        </_BaseMemberLayout>
      );
      break;
    default:
      return (
        <_BaseMemberLayout>
          <div className='text-center text-sub text-2xl mt-8'>
            以下の問題について意見してください
          </div>
          <div className='text-center text-sub text-3xl mt-6'>
            {villageState.village.title}
          </div>
          <div className='text-center text-sub text-3xl mt-6'>
            {villageState.village.content}
          </div>
          <div className='flex flex-col px-10 mt-3'>
            <textarea
              className="
            block
            w-full
            px-4  
            py-4
            border border-solid border-sub
            rounded-lg
            text-2xl
            focus: text-gray-700 focus:border-blue-600 focus:outline-none
            "
              placeholder="意見を入力してください"
              rows={10}
              onChange={(event) => setOpinion(event.target.value)}
            />
          </div>
          <div className='flex justify-between'>
            <button className='mt-10 font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'
              onClick={onClickBack}>戻る</button>
            <button className='mt-10 font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'
              onClick={onClickNextiken}>確定</button>
          </div>
        </_BaseMemberLayout>
      );
      break;
  }
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
