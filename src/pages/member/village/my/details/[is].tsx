import { AuthService } from '@/app/services/authService'
import { usePageLoading } from '@/hooks/common/usePageLoading'
import _BaseLayout from '@/layouts/_baseLayout'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

type villageData = {
  id: string,
  title: string,
  content: string,
  note: string,
  requirement	: string,
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

const MyVillageDetails: NextPage = () => {


  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;

  return (
    <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding}>
    </_BaseMemberLayout>
  )
}

export default MyVillageDetails

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
      return { props: {} }
  }
  return AuthService.authFailed();
}
