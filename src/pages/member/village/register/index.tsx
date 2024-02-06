import { RouteManager } from '@/app/manages/routeManager'
import { AuthService } from '@/app/services/authService'
import { LinkButton } from '@/components/atoms/buttons/linkButton'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

const Register: NextPage = () => {
  return (
    <_BaseMemberLayout isShowDecoration={true}>
      <Head>
        <title>ビレッジ作成</title>
      </Head>
      <div className='flex justify-center items-center mt-32'>
        <div>
          問題提起を行って<br />
          共に考えていくメンバーを募集し<br />
          様々な意見を取り入れながら<br />
          問題解決へと導きます。<br />
        </div>
      </div>
      <div className='text-center mt-16'>
        <LinkButton href={RouteManager.webRoute.member.village.register.setting}>
          ビレッジを作成する
        </LinkButton>
      </div>
    </_BaseMemberLayout>
  )
}

export default Register

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}