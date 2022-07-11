import { GuestFooter } from "../components/templates/guest/guestFooter";
import { GuestHeader } from "../components/templates/guest/guestHeader";
import { NextPage } from "next";
import _BaseLayout from "./_baseLayout";

type Props = {
    children?: React.ReactNode;
};

const _BaseGuestLayout: NextPage<Props> = ({ children }: Props) => {
    return (
        <_BaseLayout>
            <div className="relative flex flex-col bg-main text-slate-100 min-h-screen">
                <GuestHeader />
                {children}
                <div className="mt-auto text-slate-800">
                    <GuestFooter />
                </div>
            </div>
        </_BaseLayout>
    )
}
export default _BaseGuestLayout;