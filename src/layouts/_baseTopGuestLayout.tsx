import React from "react";
import { NextPage } from "next";

import { GuestTopHeader } from "@/components/templates/guest/guestTopHeader";
import { GuestFooter } from "@/components/templates/guest/guestFooter";
import _BaseLayout from "./_baseLayout";

type Props = {
    children?: React.ReactNode;
    title? : string;
};

const _BaseTopGuestLayout: NextPage<Props> = ({
    children,
    title,
}) => {
    return (
        <_BaseLayout>
            <div className="relative flex flex-col bg-main text-sub font-main ">
                <GuestTopHeader title={title} />
            </div>
            <div className="relative">
                {children}
            </div>
            <div className="mt-auto">
                <GuestFooter />
            </div>
        </_BaseLayout>
    )
}
export default _BaseTopGuestLayout;