import type { NextPage } from 'next'
import Head from 'next/head'
import _BaseGuestLayout from '../layouts/_baseGuestLayout'

const Home: NextPage = () => {
  return (
    <_BaseGuestLayout>
      <Head>
          <title>Login</title>
          <meta name="description" content="ログイン概要" />
      </Head>
      <h1>TOP</h1>
  </_BaseGuestLayout>
  )
}

export default Home
