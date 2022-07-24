import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'

const MyVillage: NextPage = () => {
  return (
    <_BaseMemberLayout title='設定'>
      <Head>
          <title>設定</title>
      </Head>
      <div className=''>
        設定画面
      </div>
  </_BaseMemberLayout>
  )
}

export default MyVillage
