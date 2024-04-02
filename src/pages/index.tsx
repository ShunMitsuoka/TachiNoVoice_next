import { RouteManager } from '@/app/manages/routeManager'
import { LinkButton } from '@/components/atoms/buttons/linkButton'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import _BaseGuestLayout from '../layouts/_baseGuestLayout'
import _BaseTopGuestLayout from '../layouts/_baseTopGuestLayout';
import { MdMeetingRoom } from 'react-icons/md'

const Home: NextPage = () => {
  return (
    <_BaseTopGuestLayout>
      <Head>
        <title>TOP | Tachi-No-Voice</title>
        <meta name="description" content="Tachi-No-Voiceは合意形成サービスです。"/>
      </Head>

      <div className='flex flex-col-reverse xl:flex-row'>
        <div className='w-full p-8 flex justify-center items-center xl:w-5/12 xl:p-16'>
          <div className='rounded-md bg-sub p-8 xl:py-20'>
			      <p className='text-3xl 2xl:text-5xl font-bold text-slate-50 leading-normal'>TACHI-NO-VOICEは「合意形成をサポートをするシステム」です。</p>
			      <p className='pt-12 text-xl 2xl:text-3xl text-slate-50 leading-normal'>合意形成における中間役となるアプリケーションの強力なサポーターとなります。</p>
		      </div>
        </div>
        <div className='w-full xl:w-7/12 xl:h-4/5'>
			    <div className='relative w-full'>
            <Image
            src={'/images/guest/top/topmeeting.jpg'}
            layout={'responsive'}
            width={600}
            height={400}
            />
				    <p className='absolute z-10 2xl:text-3xl text-slate-50 leading-normal'>社会を変える私たちの声</p>
			    </div>
        </div>
      </div>
      <div className=' py-8 px-8 md:px-40'>
        <div className='flex flex-col xl:flex-row justify-center xl:pl-20'>
          <div className=' xl:w-4/12'>
            <div className=' mx-auto'>
              <p className=' text-black xl:text-4xl sm:text-2xl leading-normal'><span className='font-bold'>ワークショップ</span>だと...</p>
              <ul className=' pl-10 list-disc xl:text-3xl sm:text-2xl text-black leading-normal'>
                <li >付箋を使い意見を集約</li>
                <li >事前準備等が必要</li>
                <li >役割を決める必要がある</li>
              </ul>
            </div>
          </div>
          <div className='w-2/12 flex justify-center items-center rotate-90 xl:rotate-0 py-12 xl:py-0 mx-auto'>
            <div className='w-full md:w-24'>
              <div className='w-full'>
                <Image
                  src={'/images/guest/top/yazirusi.png'}
                  layout={'responsive'}
                  width={70}
                  height={65}
                  style={{ width: '80%', height: 'auto'}}
                />
              </div>
            </div>
          </div>
          <div className='xl:w-2/4'>
            <div className='mx-auto'>
              <p className='text-black xl:text-4xl sm:text-2xl leading-normal'>
                <span className='text-sub font-bold'>TACHI-NO-VOICE</span>を利用すると...
              </p>
              <ul className='pl-10 list-disc  xl:text-3xl sm:text-2xl text-black leading-normal'>
                <li >手間なし、スマホで登録するだけ</li>
                <li >役割を自動で割り振りしてくれる</li>
                <li >デジタル化により決定過程を可視化</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='py-8 xl:py-16'>
          <h2 className='text-center font-bold sm:text-4xl xl:text-7xl'>TACHI-NO-VOICE</h2>
          <p className='text-center text-black pt-6 sm:text-4xl xl:text-6xl'><span className=' text-pink-400'>3つ</span>の強み</p>
      </div>


      <div className='flex flex-wrap xl:py-8 px-8 md:px-40'>
        <div className='w-full xl:w-1/3 mt-12 xl:mt-0'>
          <div className='mx-4'>
            <div className='p-12 border-solid bg-gray-50 rounded-3xl border border-3 border-pink-400'>
              <div>
                <p className='xl:text-3xl sm:text-2xl  font-bold text-black'><span className='mr-6 font-normal text-pink-400'>01</span>誰でもファシリテーターになれる</p>
              </div>
              <div className='pt-16'>
                <p className=' leading-normal xl:text-3xl sm:text-2xl  text-black'>
                  ファシリテータの経験がない方でもTACHI-NO-VOICEを利用することで一般的な
                  ファシリテーターの役割を担うことができる。
                </p>  
              </div>
            </div>
          </div>
        </div>
        <div className='w-full xl:w-1/3 mt-12 xl:mt-0'>
			    <div className='mx-4'>
				    <div className='p-12 border-solid bg-gray-50 rounded-3xl border border-3 border-pink-400'>
					    <div>
						    <p className='xl:text-3xl sm:text-2xl  font-bold text-black'><span className='mr-6 font-normal text-pink-400'>02</span>少人数からでも利用可能な手軽さ</p>
					    </div>
					    <div className='pt-16'>
						    <p className='leading-normal xl:text-3xl sm:text-2xl  text-black'>東日本大震災復興の街づくりの観点から着想を得て作成されたので数人程度のワークショップの規模から使用可能。</p>
					    </div>
				    </div>
			    </div>
		    </div>
        <div className='w-full xl:w-1/3 mt-12 xl:mt-0'>
          <div className='mx-4'>
            <div className='p-12 border-solid bg-gray-50 rounded-3xl border border-3 border-pink-400'>
              <div>
                <p className='xl:text-3xl sm:text-2xl font-bold text-black'><span className='mr-6 font-normal text-pink-400'>03</span>満足度を可視化することにより満足度を向上</p>
              </div>
              <div className='pt-16'>
                <p className='leading-normal xl:text-3xl sm:text-2xl  text-black'>各方針に対して、アンケートを取り満足度調査を実施し、各ユーザーがどのくらい方針に対して納得しているかを可視化。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='py-6'>
          <h2 className='text-center font-bold sm:text-3xl md:text-3xl xl:text-5xl text-sub py-2'>TACHI-NO-VOICE</h2>
          <p className='text-centerpt-6 sm:text-3xl md:text-3xl xl:text-5xl text-center'>利用方法</p>
      </div>
      <div className=' py-8 px-8 md:px-40'>
        <div className='w-full xl:py-8 xl:w-3/4 xl:pl-12 mx-auto'>
            <div className='flex items-center mt-8 justify-center'>
              <div className='w-1/4 xl:w-2/12'>
                <div className='w-full'>
                  {/* ファシリテーターの画像 */}
                  <Image
                    src={'/images/guest/top/facilitator.jpg'}
                    layout={'responsive'}
                    width={192}
                    height={128}
                  />
                </div>
              </div>
              <div className='w-3/4 xl:w-3/5'>
                <p className='text-black font-bold sm:text-3xl md:text-3xl xl:text-3xl  pl-10'>会議や議論におけるファシリテーター</p>
              </div>
            </div>
            <div className='flex items-center mt-8 justify-center'>
              <div className='w-1/4 xl:w-2/12'>
                <div className='w-full'>
                  {/* ビレッジの画像 */}
                  <Image
                    src={'/images/guest/top/village.png'}
                    layout={'responsive'}
                    width={192}
                    height={128}
                  />
                </div>
              </div>
              <div className='w-3/4 xl:w-3/5'>
                <p className='text-black font-bold sm:text-3xl md:text-3xl xl:text-3xl  pl-10'>話し合いの場</p>
              </div>
            </div>
            <div className='flex items-center mt-8 justify-center'>
              <div className='w-1/4 xl:w-2/12'>
                <div className='w-full'>
                  {/* ビレッジメンバーの画像 */}
                  <Image
                    src={'/images/guest/top/villagemember.png'}
                    layout={'responsive'}
                    width={192}
                    height={128}
                  />
                </div>
              </div>
              <div className='w-3/4 xl:w-3/5'>
                <p className='text-black font-bold sm:text-3xl md:text-3xl xl:text-3xl  pl-10'>会議や議論における参加者</p>
              </div>
            </div>
            <div className='flex items-center mt-8 justify-center'>
              <div className='w-1/4 xl:w-2/12'>
                <div className='w-full'>
                  {/* コアメンバーの画像 */}
                  <Image
                    src={'/images/guest/top/coremember.png'}
                    layout={'responsive'}
                    width={192}
                    height={128}
                  />
                </div>
              </div>
              <div className='w-3/4 xl:w-3/5'>
                <p className='text-black font-bold sm:text-3xl md:text-3xl xl:text-3xl pl-10'>ファシリテーターが設定したテーマをもとに意見を出す人</p>
              </div>
            </div>
            <div className='flex items-center mt-8 justify-center'>
              <div className='w-1/4 xl:w-2/12'>
                <div className='w-full'>
                  {/* ライズメンバーの画像 */}
                  <Image
                    src={'/images/guest/top/risemember.png'}
                    layout={'responsive'}
                    width={192}
                    height={128}
                  />
                </div>
              </div>
              <div className='w-3/4 xl:w-3/5'>
                <p className='text-black font-bold sm:text-3xl md:text-3xl xl:text-3xl  pl-10'>コアメンバーの意見をもとに意見を出す人</p>
              </div>
            </div>
          </div>        
      </div>
      <div className='py-8 px-8 md:px-40'>
        <h3 className='font-bold text-sub xl:text-5xl sm:text-5xl text-3xl '>①問題提起</h3>
        <div className='pt-8 flex flex-wrap'>
          <div className=' items-center w-full md:w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/atumare.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <div className='w-full mt-4 md:pl-8 md:mt-0 md:w-2/4'>
            <p className='leading-normal sm:text-2xl md:text-3xl xl:text-4xl text-black'>
              ファシリテータは話し合うテーマを設定してビレッジを作成し、ビレッジメンバーを募集します。
            </p>
          </div>
        </div>
      </div>
      <div className='py-8 px-8 md:px-40'>
        <h3 className='font-bold text-sub xl:text-5xl sm:text-5xl text-3xl'>②メンバー抽選</h3>
        <div className='pt-8 flex flex-wrap'>
          <div className=' items-center w-full md:w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/atumare.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
              <div className='w-full'>
                <Image
                  src={'/images/guest/top/corememberAndvillagerisemember.png'}
                  layout={'responsive'}
                  width={600}
                  height={400}
                />
              </div>
          </div>
          <div className='w-full mt-4 md:pl-8 md:mt-0 md:w-2/4'>
            <p className='leading-normal sm:text-2xl md:text-3xl xl:text-4xl text-black'>
              ビレッジメンバーが集まったら、ファシリテーターがメンバー抽選を行い、コアメンバー、ライズメンバーに分けられます。
            </p>
          </div>
        </div>
      </div>
      <div className='py-8 px-8 md:px-40'>
        <h3 className='font-bold text-sub xl:text-5xl sm:text-5xl text-3xl'>③コアメンバー意見募集</h3>
        <div className='pt-8 flex flex-wrap'>
          <div className=' items-center w-full md:w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/corememberOpinion.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <div className='w-full mt-4 md:pl-8 md:mt-0 md:w-2/4'> 
            <p className='leading-normal sm:text-2xl md:text-3xl xl:text-4xl text-black'>
              最初にコアメンバーがテーマについて意見を出します。
            </p>
          </div>
        </div>
      </div>
      <div className='py-8 px-8 md:px-40'>
        <h3 className='font-bold xl:text-5xl sm:text-5xl text-3xl  text-sub '>④カテゴリー分け</h3>
        <div className='pt-8 flex flex-wrap'>
          <div className=' items-center w-full md:w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/corememberOpinion.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <div className='w-full mt-4 md:pl-8 md:mt-0 md:w-2/4'> 
            <p className='leading-normal sm:text-2xl md:text-3xl xl:text-4xl text-black'>
              コアメンバーによって出された意見をファシリテーターがカテゴリーごとに仕分けします。
            </p>
          </div>
        </div>
      </div>
      <div className='py-8 px-8 md:px-40'>
        <h3 className='font-bold xl:text-5xl sm:text-5xl text-3xl text-sub '>⑤ライズメンバー意見募集</h3>
        <div className='pt-8 flex flex-wrap'>
          <div className=' items-center w-full md:w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/risememberOpinion.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <div className='w-full mt-4 md:pl-8 md:mt-0 md:w-2/4'>
            <p className='leading-normal text-2xl md:text-3xl xl:text-4xl text-black'>
              カテゴリー分けされた意見に対してライズメンバーが意見を出します。
            </p>
          </div>
        </div>
      </div>
      <div className='py-8 px-8 md:px-40'>
        <h3 className='font-bold text-sub xl:text-5xl sm:text-5xl text-3xl '>⑥評価</h3>
        <div className='pt-8 flex flex-wrap'>
          <div className=' items-center w-full md:w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/evaluation.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <div className='w-full mt-4 md:pl-8 md:mt-0 md:w-2/4'>
            <p className='leading-normal sm:text-2xl md:text-3xl xl:text-4xl text-black'>
              ビレッジメンバーは各意見に対して👍or バッドで付けることで評価を行います。
            </p>
          </div>
        </div>
      </div>
      <div className='py-8 px-8 md:px-40'>
        <h3 className='font-bold xl:text-5xl sm:text-5xl text-3xl text-sub '>⑦方針決定</h3>
        <div className='pt-8 flex flex-wrap'>
          <div className=' items-center w-full md:w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/housin.png'}
                layout={'responsive'}
                width={600}
                height={800}
              />
            </div>
          </div>
          <div className='w-full mt-4 md:pl-8 md:mt-0 md:w-2/4'>
            <p className='leading-normal sm:text-2xl md:text-3xl xl:text-4xl text-black'>
              ファシリテーターはビレッジメンバーの評価をもとにテーマに対する方針を決定します。
            </p>
          </div>
        </div>
      </div>
      <div className='py-8 px-8 md:px-40'>
        <h3 className='font-bold text-sub xl:text-5xl sm:text-5xl text-3xl'>⑧満足度調査</h3>
        <div className='pt-8 flex flex-wrap'>
          <div className=' items-center w-full md:w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/manzokudo.png'}
                layout={'responsive'}
                width={800}
                height={800}
              />
            </div>
          </div>
          <div className='w-full mt-4 md:pl-8 md:mt-0 md:w-2/4'>
            <p className='leading-normal sm:text-2xl md:text-3xl xl:text-4xl text-black'>
              ビレッジメンバーが方針に対するアンケートに答えることで満足度を可視化することができます。
            </p>
          </div>
        </div>
      </div>

      <div className='block sm:hidden '>
        <div className=' m-3'>
          <div className=' justify-center rounded-md bg-sub text-main text-center'>
            <Link href={RouteManager.webRoute.guest.auth.register}>
              <a>新規会員登録</a>
            </Link>
          </div>
        </div>
        <div className=' m-3'>
          <div className='justify-center rounded-md bg-sub text-main text-center'>
            <Link href={RouteManager.webRoute.guest.auth.login}>
              <a>ログイン</a>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className='py-16 pl-5'>
          <h2 className=' text-left font-bold text-4xl text-sub'>TACHI-NO-VOICE</h2>
          <p className=' text-left text-centerpt-6 text-4xl '>試用事例</p>
          <p className=' text-center text-4xl'>高校生を対象とするワークショップを開催</p>
      </div> */}
    </_BaseTopGuestLayout>
  )
}

export default Home
