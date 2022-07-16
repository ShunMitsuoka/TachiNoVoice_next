import { BaseButton } from '@/components/atoms/buttons/baseButton'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Register: NextPage = () => {
  return (
    <_BaseMemberLayout>
      <Head>
          <title>ビレッジ作成</title>
      </Head>

      <div className='text-center mt-96'>
        <Link href={'/member/village/register/setting'}>
          <a className='bg-sub text-main rounded px-4 py-2'>
            ビレッジを作成する
          </a>
        </Link>
      </div>
  </_BaseMemberLayout>
  )
}

export default Register
