import { PageLoading } from '@/components/templates/common/loading/pageLoading';
import { NextPage } from 'next';

type Props = {
    children?: React.ReactNode;
};

const _BaseLayout: NextPage<Props> = ({ 
    children,
}) => {
    return (
        <div id='outer-container'>
            {children}
        </div>
    )
}
export default _BaseLayout;