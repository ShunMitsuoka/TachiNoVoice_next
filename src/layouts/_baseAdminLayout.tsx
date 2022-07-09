import { AdminFooter } from '../components/templates/admin/adminFooter';
import { AdminHeader } from '../components/templates/admin/adminHeader';
import { NextPage } from 'next'
import _BaseLayout from './_baseLayout';

type Props = {
    children?: React.ReactNode;
};

const _BaseAdminLayout: NextPage<Props> = ({ children }: Props) => {
    return (
        <_BaseLayout>
            <div className='relative flex flex-col bg-slate-900 text-slate-100 min-h-screen'>
                <AdminHeader />
                <div className='grid grid-cols-12 mb-14'>
                    <div className='col-span-1'>
                        {/* <AdminSideMenu /> */}
                    </div>
                    <div className='col-span-10 pt-10'>
                        <main>
                            {children}
                        </main>
                    </div>
                    <div className='col-span-1'>
                        {/* <AdminSideMenu /> */}
                    </div>
                </div>
                <div className='mt-auto text-slate-800'>
                    <AdminFooter />
                </div>
            </div>
        </_BaseLayout>
    )
}
export default _BaseAdminLayout;