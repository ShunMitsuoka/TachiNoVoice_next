import { RouteManager } from '@/app/manages/routeManager'
import { LinkButton } from '@/components/atoms/buttons/linkButton'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import _BaseGuestLayout from '../layouts/_baseGuestLayout'

const Home: NextPage = () => {
  return (
    <_BaseGuestLayout title='TOP'>
      <Head>
          <title>Login</title>
          <meta name="description" content="ログイン概要" />
      </Head>
      <div className='py-16 text-3xl text-center'>
        <h1>TACHI-NO-VOICE</h1>
      </div>
      <div className='flex flex-col justify-center'>
        <div className='text-center'>
          <LinkButton href={RouteManager.webRoute.guest.auth.login}>
            ログインはこちら
          </LinkButton>
        </div>
        <div className='text-center mt-6'>
          <Link href={RouteManager.webRoute.guest.auth.register}>
            <a className='underline'>
              新規会員登録はこちら
            </a>
          </Link>
        </div>
      </div>
  </_BaseGuestLayout>
  )
}

export default Home
