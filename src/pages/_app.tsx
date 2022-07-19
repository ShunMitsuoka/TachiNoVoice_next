import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import { usePageLoading } from '@/hooks/common/usePageLoading'
import { useEffect } from 'react'
import { PageLoading } from '@/components/templates/common/loading/pageLoading'

function MyApp({ 
  Component, 
  pageProps : { session, ...pageProps },
}: AppProps) {

  const router = useRouter()
  const pageLoading = usePageLoading();

  useEffect(() => {
    const handleStart = (url:string) => url !== router.asPath && pageLoading.setPageLaoding(true);
    const handleComplete = () => pageLoading.setPageLaoding(false);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <SessionProvider session={session}>
      <PageLoading isShow={pageLoading.isPageLaoding} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp