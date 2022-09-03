import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import { usePageLoadingType } from '@/hooks/common/usePageLoading'
import { createContext, useEffect, useState } from 'react'
import { PageLoading } from '@/components/templates/common/loading/pageLoading'

export const LoadingContext = createContext<usePageLoadingType>({} as usePageLoadingType);

function MyApp({ 
  Component, 
  pageProps : { session, ...pageProps },
}: AppProps) {

  const router = useRouter();
  const [isShow, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url:string) => url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

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
    <>
      <PageLoading isShow={pageLoading} />
      <LoadingContext.Provider value={{isShow, setLoading}}>
        <SessionProvider session={session}>
          <PageLoading isShow={isShow} />
          <Component {...pageProps} />
        </SessionProvider>
      </LoadingContext.Provider>
    </>
  )
}

export default MyApp