import { RouteManager } from '@/app/manages/routeManager'
import { LinkButton } from '@/components/atoms/buttons/linkButton'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import _BaseGuestLayout from '../layouts/_baseGuestLayout'

const Home: NextPage = () => {
  return (
    <_BaseGuestLayout title='TOP'>
      <Head>
          <title>TOP | Tachi-No-Voice</title>
          <meta name="description" content="Tachi-No-Voiceは合意形成サービスです。" />
      </Head>
      <div className='py-16 text-3xl text-center'>
        <h1>TACHI-NO-VOICE</h1>
      </div>
      <div className="relative w-full mb-10">
          <Image
              src={'/images/guest/top/meeting.jpg'}
              layout={'responsive'}
              width={192}
              height={128}
          />
        <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full bg-white bg-opacity-80'>
          <div className='relative text-center text-xl leading-relaxed'>
            真のリーダーとは<br />
            合意を探す者ではなく<br />
            合意の形成者となる者である<br />
            <div className='text-lg absolute -bottom-8 right-0'>
              by  Martin Luther King Jr.
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <div className='text-center'>
          <LinkButton href={RouteManager.webRoute.guest.auth.login}>
            ログインはこちら
          </LinkButton>
        </div>
        <div className='text-center mt-6 '>
          <Link href={RouteManager.webRoute.guest.auth.register}>
            <a className='underline cursor-pointer'>
              新規会員登録はこちら
            </a>
          </Link>
        </div>
      </div>
  </_BaseGuestLayout>
  )
}

export default Home
