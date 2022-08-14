import { AuthService } from "@/app/services/authService";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CoreMemberOpinion: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;

  return (
    <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding}>

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
