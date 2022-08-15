import { AuthService } from "@/app/services/authService";
import { FormLabel } from "@/components/atoms/label/formLabel";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";



const CoreMemberOpinion: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;
  const [opinion, setOpinion] = useState("");
  const [now, setNow] = useState<number>(1);


  const onClickNext = () => {
    console.log(opinion);
    console.log('Next');
    setNow(1);
  }
  const onClickBack = () => {
    console.log('Back');
    setNow(0);
  }

  return (
    <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding} title='コアメンバー意見募集'>
      <div className='text-center text-sub text-2xl mt-8'>
        以下の問題について意見してください
      </div>
      <div className='text-center text-sub text-3xl mt-6'>
        ここにタイトルを入れます
      </div>
      <div className='text-center text-sub text-3xl mt-6'>
        その下にcontentを入れます
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
      <div>
        <button className='mt-10 font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'
          onClick={onClickBack}>戻る</button>
        <button className='mt-10 font-semibold px-7 py-3 rounded-lg bg-sub text-main transition ease-in-out'
          onClick={onClickNext}>確定</button>
      </div>
    </_BaseMemberLayout >
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
