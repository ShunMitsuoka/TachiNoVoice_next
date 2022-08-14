import { AuthService } from "@/app/services/authService";
import { FormLabel } from "@/components/atoms/label/formLabel";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

type formData = {
  userOpinion: string,
}

const CoreMemberOpinion: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;
  const [opinion, setOpinion] = useState<formData>({
    userOpinion: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOpinion(prevValues => {
      return { ...prevValues, [e.target.name]: e.target.value }
    });
  }

  return (
    <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding} title='コアメンバー意見募集'>
      <div className='text-center text-sub text-2xl mt-8'>以下の問題について意見してください</div>

      <div className='text-center text-sub text-3xl mt-6'>ここにタイトルを入れます</div>
      <div className='text-center text-sub text-3xl mt-6'>その下にcontentを入れます</div>
      <div className='flex flex-col px-10 mt-3'>
        <FormLabel
          htmlFor={'opinion'}
          _class='block mb-2 pt-4 px-2text-sm font-medium text-sub text-gray-900 text-main'>意見欲しいな</FormLabel>
        <input
          type='text'
          name='opinion'
          id='opinion'
        />
      </div>
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
