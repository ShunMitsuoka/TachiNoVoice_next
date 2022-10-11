import { GuestFooter } from "../components/templates/guest/guestFooter";
import { GuestHeader } from "../components/templates/guest/guestHeader";
import { NextPage } from "next";
import Image from 'next/image';
import _BaseLayout from "./_baseLayout";

type Props = {
    children?: React.ReactNode;
    title? : string;
};

const _BaseGuestLayout: NextPage<Props> = ({ 
    children,
    title,
}) => {
    return (
        <_BaseLayout>
            <div className="relative flex flex-col bg-main text-sub font-main min-h-screen">
                <GuestHeader title={title}/>
                <div className="relative flex-1 pb-32">
                    <div className="absolute top-2 left-2">
                        <Image
                            src={'/images/common/decoration/tl-deco.svg'}
                            width={300}
                            height={130}
                        />
                    </div>
                    <div className="absolute bottom-1 right-2">
                        <Image
                            src={'/images/common/decoration/br-deco.svg'}
                            width={300}
                            height={130}
                        />
                    </div>
                    <div className="relative">
                        {children}
                    </div>
                </div>
                <div className="mt-auto">
                    <GuestFooter />
                </div>
            </div>
        </_BaseLayout>
    )
}
export default _BaseGuestLayout;