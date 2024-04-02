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
      <div className='flex'>
        <div className='flex items-center w-5/12 p-16'>
            <div className='rounded-md bg-sub p-8 py-10'>
              <p className='leading-normal text-5xl font-bold text-slate-50'>TACHI-NO-VOICEは「合意形成をサポートをするシステム」です。</p>
              <p className='leading-normal pt-12  text-2xl text-slate-50'>合意形成における中間役となるアプリケーションの強力なサポーターとなります。</p>
          </div>
        </div>
        <div className='w-7/12 h-4/5'>
          <div className=' w-full'>
            <Image
              src={'/images/guest/top/topmeeting.jpg'}
              layout={'responsive'}
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className=' py-8 px-8'>
        <div className='flex flex-col xl:flex-row justify-center xl:pl-20'>
          <div className=' xl:w-4/12'>
            <div className=' mx-auto'>
              <p className=' text-black text-4xl leading-normal'><span className='font-bold'>ワークショップ</span>だと...</p>
              <ul className=' pl-10 list-disc text-4xl text-black leading-normal'>
                <li>付箋を使い意見を集約</li>
                <li>事前準備等が必要</li>
                <li>役割を決める必要がある</li>
              </ul>
            </div>
          </div>
          <div className=' w-2/12 flex justify-center items-center rotate-90 xl:rotate-0 py-12 xl:py-0 mx-auto'>
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
              <p className='text-black text-4xl leading-normal'>
                <span className='text-sub font-bold'>TACHI-NO-VOICE</span>を利用すると...
              </p>
              <ul className='pl-10 list-disc text-4xl text-black leading-normal'>
                <li>手間なし、スマホで登録するだけ</li>
                <li>役割を自動で割り振りしてくれる</li>
                <li>デジタル化により決定過程を可視化</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='py-16'>
          <h2 className='text-center font-bold text-7xl text-sub'>TACHI-NO-VOICE</h2>
          <p className='text-centerpt-6 text-6xl text-center'><span className=' text-pink-400'>3つ</span>の強み</p>
      </div>
      <div className='flex py-8 px-10'>
        <div className='w-1/3 p-12 border-solid bg-gray-200 rounded-md mx-4'>
          <div>
            <p className=' text-4xl font-bold text-black'><span className='mr-6 text-5xl text-pink-400'>01</span>誰でもファシリテーターになれる</p>
          </div>
          <div className='pt-16'>
            <p className=' leading-normal text-3xl text-black'>
              ファシリテータの経験がない方でもTACHI-NO-VOICEを利用することで一般的な
              ファシリテーターの役割を担うことができる。
            </p>
          </div>
        </div>
        <div className='w-1/3 p-12 border-solid bg-gray-200 rounded-md mx-4'>
          <div>
            <p className=' text-4xl font-bold text-black'><span className='mr-6 text-5xl text-pink-400'>02</span>少人数からでも利用可能な手軽さ</p>
          </div>
          <div className='pt-16'>
            <p className=' leading-normal text-3xl text-black'>
              東日本大震災復興の街づくりの観点から着想を得て作成されたので数人程度のワークショップの規模から使用可能。
            </p>
          </div>
        </div>
        <div className='w-1/3 p-12 border-solid bg-gray-200 rounded-md mx-4'>
          <div>
            <p className=' text-4xl font-bold text-black'><span className='mr-6 text-5xl text-pink-400'>03</span>満足度を可視化することにより納得度を向上</p>
          </div>
          <div className='pt-16'>
            <p className=' leading-normal text-3xl text-black'>
              各方針に対して、アンケートを取り満足度調査を実施し、各ユーザーがどのくらい方針に対して納得しているかを可視化。
            </p>
          </div>
        </div>
      </div>
      <div className='py-6'>
          <h2 className='text-center font-bold text-7xl text-sub py-2'>TACHI-NO-VOICE</h2>
          <p className='text-centerpt-6 text-6xl text-center'>利用方法</p>
      </div>
      <div className='py-6'>
        <div className='flex justify-center'>
          <div className=' w-48 h-48'>
              {/* ファシリテーターの画像 */}
            <Image
                src={'/images/guest/top/facilitator.jpg'}
                layout={'responsive'}
                width={192}
                height={128}
            />
          </div>
          <p className='text-black text-center font-bold text-2xl py-10'>会議や議論におけるファシリテーター</p>
        </div>
        <div className='flex justify-center'>
          <div className=' w-48 h-48'>
            {/* ビレッジの画像 */}
            <Image
                  src={'/images/guest/top/village.png'}
                  layout={'responsive'}
                  width={600}
                  height={400}
              />
          </div>
            <p className='text-black text-center font-bold text-2xl py-10'>話し合いの場</p>
        </div>
        <div className='flex justify-center'>
          <div className=' w-48 h-48'>
            {/* ビレッジメンバーの画像 */}
            <Image
                  src={'/images/guest/top/villagemember.png'}
                  layout={'responsive'}
                  width={600}
                  height={400}
              />
          </div>
            <p className='text-black text-center font-bold text-2xl py-10'>会議や議論における参加者</p>
        </div>
        <div className='flex justify-center'>
          <div className=' w-48  h-48'>
            {/* コアメンバーの画像 */}
            <Image
                  src={'/images/guest/top/coremember.png'}
                  layout={'responsive'}
                  width={600}
                  height={400}
              />
          </div>
            <p className='text-black text-center font-bold text-2xl py-10'>ファシリテーターが設定したテーマをもとに意見を出す人</p>
        </div>
        <div className='flex justify-center'>
          <div className=' w-48 h-48'>
            {/* ライズメンバーの画像 */}
            <Image
                  src={'/images/guest/top/risemember.png'}
                  layout={'responsive'}
                  width={600}
                  height={400}
              />
          </div>
            <p className='text-black text-center font-bold text-2xl py-10'>コアメンバーの意見をもとに意見を出す人</p>
        </div>
      </div>
      <div className='py-8 px-10 justify-center'>
        <h3 className='font-bold text-5xl text-sub'>①問題提起</h3>
        <div className='pt-8 flex'>
          <div className=' items-center w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/atumare.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <p className='font-black text-2xl'>
          <p className='font-black text-2xl'>
            ファシリテータは話し合うテーマを設定してビレッジを作成し、ビレッジメンバーを募集します。
          </p>
          </p>
        </div>
      </div>
      <div className='py-8 px-10 justify-center'>
        <h3 className='font-bold text-5xl text-sub'>②問題提起</h3>
        <div className='pt-8 flex'>
          <div className=' items-center w-2/4  flex-col'>
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
          <p className='font-black text-2xl'>
            ビレッジメンバーが集まったら、ファシリテーターがメンバー抽選を行い、コアメンバー、ライズメンバーに分けられます。
          </p>
        </div>
      </div>
      <div className='py-8 px-10 justify-center'>
        <h3 className='font-bold text-5xl text-sub'>③コアメンバー意見募集</h3>
        <div className='pt-8 flex'>
          <div className=' items-center w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/corememberOpinion.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <p className='font-black text-2xl'>
            最初にコアメンバーがテーマについて意見を出します。
          </p>
        </div>
      </div>
      <div className='py-8 px-10 justify-center'>
        <h3 className='font-bold text-5xl text-sub'>④カテゴリー分け</h3>
        <div className='pt-8 flex'>
          <div className=' items-center w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/corememberOpinion.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <p className='font-black text-2xl'>
            最初にコアメンバーがテーマについて意見を出します。
          </p>
        </div>
      </div>
      <div className='py-8 px-10 justify-center'>
        <h3 className='font-bold text-5xl text-sub'>⑤ライズメンバー意見募集</h3>
        <div className='pt-8 flex'>
          <div className=' items-center w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/risememberOpinion.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <p className='font-black text-2xl'>
            カテゴリー分けされた意見に対してライズメンバーが意見を出します。
          </p>
        </div>
      </div>
      <div className='py-8 px-10 justify-center'>
        <h3 className='font-bold text-5xl text-sub'>⑥評価</h3>
        <div className='pt-8 flex'>
          <div className=' items-center w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/evaluation.png'}
                layout={'responsive'}
                width={600}
                height={400}
              />
            </div>
          </div>
          <p className='font-black text-2xl'>
            ビレッジメンバーは各意見に対して👍or バッドで付けることで評価を行います。
          </p>
        </div>
      </div>
      <div className='py-8 px-10 justify-center'>
        <h3 className='font-bold text-5xl text-sub'>⑦方針決定</h3>
        <div className='pt-8 flex'>
          <div className=' items-center w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/housin.png'}
                layout={'responsive'}
                width={600}
                height={800}
              />
            </div>
          </div>
          <p className='font-black text-2xl'>
            ファシリテーターはビレッジメンバーの評価をもとにテーマに対する方針を決定します。
          </p>
        </div>
      </div>
      <div className='py-8 px-10 justify-center'>
        <h3 className='font-bold text-5xl text-sub'>⑧満足度調査</h3>
        <div className='pt-8 flex'>
          <div className=' items-center w-2/4'>
            <div className='w-full'>
              <Image
                src={'/images/guest/top/manzokudo.png'}
                layout={'responsive'}
                width={800}
                height={800}
              />
            </div>
          </div>
          <p className='font-black text-2xl'>
            ビレッジメンバーが方針に対するアンケートに答えることで満足度を可視化することができます。
          </p>
        </div>
      </div>
      <div className='py-16 pl-5'>
          <h2 className=' text-left font-bold text-4xl text-sub'>TACHI-NO-VOICE</h2>
          <p className=' text-left text-centerpt-6 text-4xl '>試用事例</p>
          <p className=' text-center text-4xl'>高校生を対象とするワークショップを開催</p>
      </div>
    </_BaseTopGuestLayout>
  )
}

export default Home
