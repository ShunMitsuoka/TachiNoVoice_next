import { GuestFooter } from "../components/templates/guest/guestFooter";
import { GuestHeader } from "../components/templates/guest/guestHeader";
import { NextPage } from "next";
import Image from 'next/image';
import _BaseLayout from "./_baseLayout";
import React from "react";

type Props = {
    children?: React.ReactNode;
    title?: string;
}

const _BaseTopGuestLayout: NextPage<Props> = ({
    children,
    title
}) => {
    return (
        <_BaseLayout>
            <div className="relative flex min-h-screen">
                <div className="茶色□">
                    <div className="シロ太文字">
                        TACHI-NO-VOICEは「合意形成をサポートするシステム」です。
                    </div>
                    <div className="シロ細文字">
                       合意形成における中間役となるファシリテーターの協力なサポーターとなります。 
                    </div>
                </div>
                
                <div className="イメージ">
                    <Image
                        src={'/images/common/decoration/br-deco.svg'}
                        width={300}
                        height={120}
                    />
                </div>

            </div>
        </_BaseLayout>
    )
}