import { MemberFooter } from '../components/templates/member/memberFooter';
import { MemberHeader } from '../components/templates/member/memberHeader';
import { NextPage } from 'next'
import _BaseLayout from './_baseLayout';
import Head from 'next/head';
import Image from 'next/image';

type Props = {
    children?: React.ReactNode;
    title? : string;
    isShowDecoration? : boolean;

};

const _BaseMemberLayout: NextPage<Props> = ({ 
    children,
    title,
    isShowDecoration = false,
}) => {
    return (
        <_BaseLayout>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="relative flex flex-col bg-main text-sub font-main min-h-screen">
                <MemberHeader title={title}/>
                <div className="relative pb-32 flex-1">
                    {
                        isShowDecoration && 
                        <div className="absolute top-2 left-2">
                            <Image
                                src={'/images/common/decoration/tl-deco.svg'}
                                width={300}
                                height={130}
                            />
                        </div>
                    }
                    {children}
                </div>
            </div>
            <div className="fixed bottom-0 w-full">
                <MemberFooter />
            </div>
        </_BaseLayout>
    )
}
export default _BaseMemberLayout;