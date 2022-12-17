import { RouteManager } from '@/app/manages/routeManager'
import { LinkButton } from '@/components/atoms/buttons/linkButton'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const MyVillage: NextPage = () => {
  return (
    <_BaseMemberLayout title='設定'>
      <Head>
        <title>設定</title>
      </Head>
      <div className='relative w-full h-full'>
        <div className="absolute top-2 right-2">
          <Image
            src={'/images/common/decoration/tr-deco.svg'}
            width={300}
            height={130}
          />
        </div>
        <div className='flex flex-col'>
          <div className='text-center mt-6 mb-4'>
            <LinkButton href={RouteManager.webRoute.member.setting.userinfomation} >
              ユーザー情報変更
            </LinkButton>
          </div>
        </div>
      </div>
    </_BaseMemberLayout>
  )
}

export default MyVillage
