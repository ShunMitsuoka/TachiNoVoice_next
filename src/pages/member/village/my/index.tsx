import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'

const MyVillage: NextPage = () => {
  return (
    <_BaseMemberLayout title='ビレッジ'>
      <Head>
          <title>My ビレッジ</title>
      </Head>
      <div className=''>
          参加中ビレッジ一覧
      </div>
  </_BaseMemberLayout>
  )
}

export default MyVillage
