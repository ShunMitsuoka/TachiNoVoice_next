import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import React from 'react';

interface Props {
}

export const CompleteRegisterVillage: React.FC<Props> = () => {
    return (
        <div className='text-center'>
            <p className='text-xl'>ビレッジの作成が完了しました。</p>
            <div className='mt-6'>
                <LinkButton href={RouteManager.webRoute.member.village.my.index}>
                    ビレッジ一覧へ
                </LinkButton>
            </div>
        </div>
    )
}