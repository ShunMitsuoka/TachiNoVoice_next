import { appConst } from '@/app/const/appConst';
import Image from 'next/image';
import React from 'react';

interface Props {
    gender: number;
}

export const GenderIcon: React.FC<Props> = ({
    gender,
}) => {

    const icon = () => {
        switch (gender) {
            case appConst.user.gender.man:
                return <Image
                    src={'/images/common/gender/man.png'}
                    width={20}
                    height={20}
                />
            case appConst.user.gender.woman:
                return <Image
                    src={'/images/common/gender/woman.png'}
                    width={20}
                    height={20}
                />
            default:
                break;
        }
    }

    return (
        <>{icon()}</>
    )
}