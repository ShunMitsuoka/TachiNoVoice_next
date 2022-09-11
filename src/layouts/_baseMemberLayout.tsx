import { MemberFooter } from '../components/templates/member/memberFooter';
import { MemberHeader } from '../components/templates/member/memberHeader';
import { NextPage } from 'next'
import _BaseLayout from './_baseLayout';
import Head from 'next/head';

type Props = {
    children?: React.ReactNode;
    title? : string;
};

const _BaseMemberLayout: NextPage<Props> = ({ 
    children,
    title,
}) => {
    return (
        <_BaseLayout>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="relative flex flex-col bg-main text-sub font-main min-h-screen">
                <MemberHeader title={title}/>
                <div className="pb-32 flex-1">
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