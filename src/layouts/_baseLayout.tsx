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
        <div id='outer-container'>
            <PageLoading isShow={pageLoding}/>
            {children}
        </div>
    )
}
export default _BaseLayout;