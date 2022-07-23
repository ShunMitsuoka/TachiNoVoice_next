import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'

const MyVillage: NextPage = () => {
  return (
    <_BaseMemberLayout title='お知らせ'>
      <Head>
          <title>お知らせ</title>
      </Head>
      <div className=''>
      お知らせ画面
      </div>
  </_BaseMemberLayout>
  )
}

export default MyVillage
