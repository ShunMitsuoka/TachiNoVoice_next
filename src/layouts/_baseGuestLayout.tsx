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
            <div className="relative flex flex-col bg-main text-sub font-main min-h-screen">
                <GuestHeader />
                <div className="pb-32">
                    {children}
                </div>
                <div className="mt-auto">
                    <GuestFooter />
                </div>
            </div>
        </_BaseLayout>
    )
}
export default _BaseGuestLayout;