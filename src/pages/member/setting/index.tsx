import { RouteManager } from '@/app/manages/routeManager'
import { LinkButton } from '@/components/atoms/buttons/linkButton'
import { SectionTitle } from '@/components/modules/common/section/sectionTitle'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const MyVillage: NextPage = () => {
  return (
    <_BaseMemberLayout title='設定'>
      <Head>
        <title>設定</title>
      </Head>
      <div className='relative w-full h-full px-6 pt-14'>
        <div className="absolute top-2 right-2">
          <Image
            src={'/images/common/decoration/tr-deco.svg'}
            width={300}
            height={130}
          />
        </div>
        <div className=' relative'>
          <SectionTitle>アプリ設定</SectionTitle>
          <ul className='mt-2'>
            <li className='border-b border-sub'>
              <Link href={RouteManager.webRoute.member.setting.userinfomation}>
                <div className=' py-2 pl-2'>
                  ・ユーザー情報変更
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </_BaseMemberLayout>
  )
}

export default MyVillage
