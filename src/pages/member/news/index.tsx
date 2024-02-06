import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'

const MyVillage: NextPage = () => {
  return (
    <_BaseMemberLayout title='お知らせ'>
      <Head>
          <title>お知らせ</title>
      </Head>
      <div className=' flex justify-center items-center h-96 px-14'>
        現在、実装中です。<br />
        お知らせ機能に関しましては、<br />
        今しばらくお待ちください。
      </div>
  </_BaseMemberLayout>
  )
}

export default MyVillage
