import { PageLoading } from '@/components/templates/common/loading/pageLoading';
import { NextPage } from 'next';

type Props = {
    children?: React.ReactNode;
    pageLoding : boolean;
};

const _BaseLayout: NextPage<Props> = ({ 
    children,
    pageLoding
}) => {
    return (
        <>
            <PageLoading isShow={pageLoding}/>
            {children}
        </>
    )
}
export default _BaseLayout;