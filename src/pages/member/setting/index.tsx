import { RouteManager } from '@/app/manages/routeManager'
import { LinkButton } from '@/components/atoms/buttons/linkButton'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'

const MyVillage: NextPage = () => {
  return (
    <_BaseMemberLayout title='設定'>
      <Head>
        <title>設定</title>
      </Head>

      <div className='text-center mt-10'>
        <LinkButton href={RouteManager.webRoute.member.setting.userinfomation} >
          ユーザー情報変更
        </LinkButton>
      </div>

    </_BaseMemberLayout>
  )
}

export default MyVillage
